using Backend.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Data;

public static class DataSeeder
{
    public static async Task ApplyMigrationsAndSeedAsync(this IHost app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            var context = services.GetRequiredService<ApplicationContext>();
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole<int>>>();

            if ((await context.Database.GetPendingMigrationsAsync()).Any())
            {
                await context.Database.MigrateAsync();
            }

            await SeedDataAsync(context, userManager, roleManager);
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<ApplicationContext>>();
            logger.LogError(ex, "Помилка під час міграції або наповнення бази.");
            throw;
        }
    }

    private static async Task SeedDataAsync(
        ApplicationContext context,
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole<int>> roleManager
    )
    {
        #region Identity (Roles & Admin)
        string[] roleNames = { "Admin", "Customer" };
        foreach (var roleName in roleNames)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole<int> { Name = roleName });
            }
        }

        const string adminEmail = "admin@cinema.ua";
        if (await userManager.FindByEmailAsync(adminEmail) == null)
        {
            var admin = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                EmailConfirmed = true,
                CreatedAt = DateTime.UtcNow
            };

            var result = await userManager.CreateAsync(admin, "Admin123!");

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(admin, "Admin");
            }
        }
        #endregion
        #region Studios
        if (!await context.Set<Studio>().AnyAsync())
        {
            context.Set<Studio>().AddRange(
                new Studio { Name = "Universal Pictures" },
                new Studio { Name = "Warner Bros. Pictures" },
                new Studio { Name = "Legendary Entertainment" },
                new Studio { Name = "Paramount Pictures" },
                new Studio { Name = "20th Century Studios" },
                new Studio { Name = "A24" },
                new Studio { Name = "Columbia Pictures" },
                new Studio { Name = "Marvel Studios" },
                new Studio { Name = "Pixar Animation Studios" },
                new Studio { Name = "Netflix Studios" },
                new Studio { Name = "Sony Pictures" },
                new Studio { Name = "Lionsgate" }
            );
            await context.SaveChangesAsync();
        }
        #endregion

        #region Genres
        if (!await context.Set<Genre>().AnyAsync())
        {
            context.Set<Genre>().AddRange(
                new Genre { Name = "Наукова фантастика" },
                new Genre { Name = "Драма" },
                new Genre { Name = "Біографія" },
                new Genre { Name = "Екшн" },
                new Genre { Name = "Трилер" },
                new Genre { Name = "Пригоди" },
                new Genre { Name = "Кримінал" },
                new Genre { Name = "Фентезі" },
                new Genre { Name = "Жахи" },
                new Genre { Name = "Комедія" },
                new Genre { Name = "Романтика" },
                new Genre { Name = "Анімація" },
                new Genre { Name = "Містика" }
            );
            await context.SaveChangesAsync();
        }
        #endregion

        #region Actors
        if (!await context.Set<Actor>().AnyAsync())
        {
            context.Set<Actor>().AddRange(
                new Actor { Name = "Кілліан Мерфі" },
                new Actor { Name = "Тімоті Шаламе" },
                new Actor { Name = "Зендея" },
                new Actor { Name = "Роберт Дауні-молодший" },
                new Actor { Name = "Хоакін Фенікс" },
                new Actor { Name = "Меттью Макконагі" },
                new Actor { Name = "Енн Гетевей" },
                new Actor { Name = "Леонардо Ді Капріо" },
                new Actor { Name = "Марго Роббі" },
                new Actor { Name = "Бред Пітт" },
                new Actor { Name = "Крістіан Бейл" },
                new Actor { Name = "Том Гарді" },
                new Actor { Name = "Емма Стоун" },
                new Actor { Name = "Раян Гослінг" },
                new Actor { Name = "Кіану Рівз" }
            );
            await context.SaveChangesAsync();
        }
        #endregion

        #region Movies
        if (!await context.Movies.AnyAsync())
        {
            var studios = await context.Set<Studio>().ToListAsync();

            var movies = new List<Movie>
            {
                new()
                {
                    TitleORG = "Oppenheimer",
                    TitleUKR = "Оппенгеймер",
                    Description = "Історія людини, яка створила атомну бомбу.",
                    Duration = 180,
                    ReleaseDate = CreateUtcDate(2023, 7, 21),
                    FinishDate = CreateUtcDate(2026, 12, 31),
                    IMDBRating = 8.4m,
                    Director = "Крістофер Нолан",
                    Country = "США",
                    StudioId = studios.First(s => s.Name == "Universal Pictures").Id,
                    AgeRating = AgeRating._16Plus,
                    Subtitles = true
                },
                new()
                {
                    TitleORG = "Dune: Part Two",
                    TitleUKR = "Дюна: Частина друга",
                    Description = "Пол Атрідес стає лідером фрименів.",
                    Duration = 166,
                    ReleaseDate = CreateUtcDate(2024, 3, 1),
                    FinishDate = CreateUtcDate(2026, 11, 30),
                    IMDBRating = 8.6m,
                    Director = "Дені Вільнев",
                    Country = "США, Канада",
                    StudioId = studios.First(s => s.Name == "Legendary Entertainment").Id,
                    AgeRating = AgeRating._12Plus,
                    Subtitles = true
                },
                new()
                {
                    TitleORG = "Interstellar",
                    TitleUKR = "Інтерстеллар",
                    Description = "Подорож крізь простір і час заради людства.",
                    Duration = 169,
                    ReleaseDate = CreateUtcDate(2014, 11, 7),
                    FinishDate = CreateUtcDate(2026, 12, 31),
                    IMDBRating = 8.7m,
                    Director = "Крістофер Нолан",
                    Country = "США",
                    StudioId = studios.First(s => s.Name == "Paramount Pictures").Id,
                    AgeRating = AgeRating._12Plus,
                    Subtitles = true
                },
                new()
                {
                    TitleORG = "Joker",
                    TitleUKR = "Джокер",
                    Description = "Психологічна історія становлення лиходія.",
                    Duration = 122,
                    ReleaseDate = CreateUtcDate(2019, 10, 4),
                    FinishDate = CreateUtcDate(2026, 6, 30),
                    IMDBRating = 8.5m,
                    Director = "Тодд Філліпс",
                    Country = "США",
                    StudioId = studios.First(s => s.Name == "Warner Bros. Pictures").Id,
                    AgeRating = AgeRating._18Plus,
                    Subtitles = true
                }
            };

            await context.Movies.AddRangeAsync(movies);
            await context.SaveChangesAsync();

            await SeedMovieRelationships(context, movies);
        }
        #endregion

        #region Halls + Seats
        if (!await context.Halls.AnyAsync())
        {
            var halls = new List<Hall>
            {
                new() { Name = "IMAX Київ", Capacity = 100, Format = HallFormat.IMAX },
                new() { Name = "4DX Львів", Capacity = 60, Format = HallFormat.REGULAR },
                new() { Name = "Dolby Atmos", Capacity = 80, Format = HallFormat.REGULAR },
                new() { Name = "VIP Lounge", Capacity = 40, Format = HallFormat.REGULAR }
            };

            await context.Halls.AddRangeAsync(halls);
            await context.SaveChangesAsync();

            foreach (var hall in halls)
            {
                for (short row = 1; row <= hall.Capacity / 10; row++)
                {
                    for (short seat = 1; seat <= 10; seat++)
                    {
                        context.Seats.Add(new Seat
                        {
                            HallId = hall.Id,
                            RowNumber = row,
                            SeatNumber = seat,
                            SeatType = row == 1 ? SeatType.VIP : SeatType.REGULAR,
                            IsReserved = false
                        });
                    }
                }
            }
            await context.SaveChangesAsync();
        }
        #endregion

        #region Sessions + Prices
        if (!await context.Sessions.AnyAsync())
        {
            var movies = await context.Movies.ToListAsync();
            var halls = await context.Halls.ToListAsync();

            foreach (var movie in movies)
            {
                foreach (var hall in halls.Take(2))
                {
                    var session = new Session
                    {
                        MovieId = movie.Id,
                        HallId = hall.Id,
                        StartTime = DateTime.UtcNow.AddDays(1).AddHours(18),
                        EndTime = DateTime.UtcNow.AddDays(1).AddHours(21)
                    };

                    await context.Sessions.AddAsync(session);
                    await context.SaveChangesAsync();

                    context.Prices.AddRange(
                        new Price { SessionId = session.Id, SeatType = SeatType.REGULAR, Value = 220 },
                        new Price { SessionId = session.Id, SeatType = SeatType.VIP, Value = 380 }
                    );
                    await context.SaveChangesAsync();
                }
            }
        }
        #endregion

        #region Discounts
        if (!await context.Set<Discount>().AnyAsync())
        {
            context.Set<Discount>().AddRange(
                new Discount { Type = DiscountType.REGULAR, Percentage = 0, IsActive = true },
                new Discount { Type = DiscountType.STUDENT, Percentage = 20, IsActive = true },
                new Discount { Type = DiscountType.MILITARY, Percentage = 30, IsActive = true },
                new Discount { Type = DiscountType.PROMOCODE, Percentage = 25, IsActive = true }
            );
            await context.SaveChangesAsync();
        }
        #endregion
    }

    private static async Task SeedMovieRelationships(ApplicationContext context, List<Movie> movies)
    {
        if (await context.MovieGenres.AnyAsync() || await context.MovieActors.AnyAsync())
            return;

        var genres = await context.Set<Genre>().ToListAsync();
        var actors = await context.Set<Actor>().ToListAsync();

        void AddMG(Movie m, params string[] g) =>
            context.MovieGenres.AddRange(g.Select(x =>
                new MovieGenre { MovieId = m.Id, GenreId = genres.First(y => y.Name == x).Id }));

        void AddMA(Movie m, params string[] a) =>
            context.MovieActors.AddRange(a.Select(x =>
                new MovieActor { MovieId = m.Id, ActorId = actors.First(y => y.Name == x).Id }));

        AddMG(movies[0], "Біографія", "Драма");
        AddMA(movies[0], "Кілліан Мерфі", "Роберт Дауні-молодший");

        AddMG(movies[1], "Наукова фантастика", "Пригоди");
        AddMA(movies[1], "Тімоті Шаламе", "Зендея");

        AddMG(movies[2], "Наукова фантастика", "Драма");
        AddMA(movies[2], "Меттью Макконагі", "Енн Гетевей");

        AddMG(movies[3], "Драма", "Кримінал", "Трилер");
        AddMA(movies[3], "Хоакін Фенікс");

        await context.SaveChangesAsync();
    }

    private static DateTime CreateUtcDate(int y, int m, int d) =>
        DateTime.SpecifyKind(new DateTime(y, m, d), DateTimeKind.Utc);
}
