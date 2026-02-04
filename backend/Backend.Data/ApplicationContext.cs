using Backend.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ApplicationContext(DbContextOptions<ApplicationContext> options)
        : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>(options)
    {
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
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(
                typeof(ApplicationContext).Assembly
            );
        }
    }
}