using Backend.Data.Helpers;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Backend.Domain.Interfaces;

namespace Backend.Data
{
    public class ApplicationContext(IUserContext currentUserService, DbContextOptions<ApplicationContext> options)
        : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>(options)
    {
        public bool UseAuditing { get; set; } = true;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Hall>()
                .HasQueryFilter(h => !h.IsDeleted);

            modelBuilder.Entity<Seat>()
                .HasQueryFilter(s => !s.Hall.IsDeleted);

            modelBuilder.Entity<Session>()
                .HasQueryFilter(s => !s.Hall.IsDeleted);

            modelBuilder.ApplyConfigurationsFromAssembly(
                typeof(ApplicationContext).Assembly
            );
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            if (!UseAuditing) return await base.SaveChangesAsync(cancellationToken);

            var auditEntries = HandleAudit();

            try
            {
                var result = await base.SaveChangesAsync(cancellationToken);
                if (auditEntries.Count != 0) await OnAfterSaveChangesAsync(auditEntries);
                return result;
            }
            catch (DbUpdateException)
            {
                ChangeTracker.Clear();
                throw;
            }
        }

        private async Task OnAfterSaveChangesAsync(List<AuditEntry> auditEntries) //for proper ids only after saving
        {
            foreach (var auditEntry in auditEntries)
            {
                foreach (var prop in auditEntry.Entry.Properties)
                {
                    if (prop.Metadata.IsPrimaryKey())
                    {
                        auditEntry.KeyValues[prop.Metadata.Name] = prop.CurrentValue;
                    }
                }

                AuditLogs.Add(auditEntry.ToAuditLog());
            }

            await base.SaveChangesAsync();
        }

        private List<AuditEntry> HandleAudit()
        {
            ChangeTracker.DetectChanges();
            var auditEntries = new List<AuditEntry>();
            var userEmail = currentUserService.Email ?? "System";

            foreach (var entry in ChangeTracker.Entries())
            {
                // Skip auditing the AuditLogs themselves (to avoid infinite loops)
                // Skip detached and unchanged entities( method GET)
                if (entry.Entity is AuditLog ||
                    entry.Entity is ErrorLog ||
                    entry.State == EntityState.Detached ||
                    entry.State == EntityState.Unchanged)
                {
                    continue;
                }

                var auditEntry = new AuditEntry(entry)
                {
                    TableName = entry.Entity.GetType().Name,
                    Action = entry.State.ToString(),
                    UserEmail = userEmail
                };

                auditEntries.Add(auditEntry);

                foreach (var property in entry.Properties)
                {
                    var propertyName = property.Metadata.Name;

                    if (property.Metadata.IsPrimaryKey())
                    {
                        auditEntry.KeyValues[propertyName] = property.CurrentValue;
                        continue;
                    }

                    switch (entry.State)
                    {
                        case EntityState.Added:
                            auditEntry.NewValues[propertyName] = property.CurrentValue;
                            break;

                        case EntityState.Deleted:
                            auditEntry.OldValues[propertyName] = property.OriginalValue;
                            break;

                        case EntityState.Modified:
                            if (property.IsModified)
                            {
                                auditEntry.ChangedColumns.Add(propertyName);
                                auditEntry.OldValues[propertyName] = property.OriginalValue;
                                auditEntry.NewValues[propertyName] = property.CurrentValue;
                            }

                            break;
                        case EntityState.Detached:
                        case EntityState.Unchanged:
                            break;
                        default:
                            throw new ArgumentOutOfRangeException();
                    }
                }
            }

            return auditEntries;
        }

        public DbSet<Booking> Bookings { get; set; } = null!;
        public DbSet<Hall> Halls { get; set; } = null!;
        public DbSet<Session> Sessions { get; set; } = null!;
        public DbSet<Ticket> Tickets { get; set; } = null!;
        public DbSet<Seat> Seats { get; set; } = null!;
        public DbSet<Price> Prices { get; set; } = null!;
        public DbSet<Movie> Movies { get; set; } = null!;
        public DbSet<MovieActor> MovieActors { get; set; } = null!;
        public DbSet<MovieGenre> MovieGenres { get; set; } = null!;
        public DbSet<Studio> Studios { get; set; } = null!;
        public DbSet<ContactMessage> ContactMessages { get; set; } = null!;

        public DbSet<AuditLog> AuditLogs { get; set; } = null!;

        public DbSet<ErrorLog> ErrorLogs { get; set; } = null!;
    }
}