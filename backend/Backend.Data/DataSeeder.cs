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
            logger.LogError(ex, "An error occurred during migration or seeding.");
            throw;
        }
    }

    private static async Task SeedDataAsync(
        ApplicationContext context,
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole<int>> roleManager
    )
    {
        context.UseAuditing = false;

        #region Identity (Roles & Admin)

        string[] roleNames = ["Admin", "Customer"];
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
            if (result.Succeeded) await userManager.AddToRoleAsync(admin, "Admin");
        }

        var demoUsers = new[] { "alice@test.com", "bob@test.com", "charlie@test.com" };
        foreach (var email in demoUsers)
        {
            if (await userManager.FindByEmailAsync(email) != null) continue;
            var user = new ApplicationUser
                { UserName = email, Email = email, EmailConfirmed = true, CreatedAt = DateTime.UtcNow };
            var result = await userManager.CreateAsync(user, "User123!");
            if (result.Succeeded) await userManager.AddToRoleAsync(user, "Customer");
        }

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
                new Actor { Name = "Cillian Murphy" },
                new Actor { Name = "Timothée Chalamet" },
                new Actor { Name = "Zendaya" },
                new Actor { Name = "Robert Downey Jr." },
                new Actor { Name = "Joaquin Phoenix" },
                new Actor { Name = "Matthew McConaughey" },
                new Actor { Name = "Anne Hathaway" },
                new Actor { Name = "Leonardo DiCaprio" },
                new Actor { Name = "Margot Robbie" },
                new Actor { Name = "Brad Pitt" },
                new Actor { Name = "Christian Bale" },
                new Actor { Name = "Tom Hardy" },
                new Actor { Name = "Emma Stone" },
                new Actor { Name = "Ryan Gosling" },
                new Actor { Name = "Keanu Reeves" },
                new Actor { Name = "Sam Worthington" },
                new Actor { Name = "Zoe Saldana" },
                new Actor { Name = "Robert Pattinson" },
                new Actor { Name = "Tom Holland" },
                new Actor { Name = "Samuel L. Jackson" },
                new Actor { Name = "Matt Damon" },
                new Actor { Name = "Emily Blunt" },
                new Actor { Name = "Rebecca Ferguson" },
                new Actor { Name = "Jessica Chastain" },
                new Actor { Name = "Robert De Niro" },
                new Actor { Name = "Shameik Moore" },
                new Actor { Name = "Hailee Steinfeld" },
                new Actor { Name = "John Travolta" },
                new Actor { Name = "Uma Thurman" }
            );
            await context.SaveChangesAsync();
        }

        #endregion

        #region Movies

        if (!await context.Movies.AnyAsync())
        {
            var studios = await context.Set<Studio>().ToListAsync();

            int GetSid(string name) => studios.FirstOrDefault(s => s.Name == name)?.Id ?? studios.First().Id;

            var movies = new List<Movie>
            {
                new()
                {
                    TitleOrg = "Oppenheimer",
                    TitleUkr = "Оппенгеймер",
                    Description =
                        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
                    Duration = 180,
                    ReleaseDate = CreateUtcDate(2023, 7, 21),
                    FinishDate = CreateUtcDate(2026, 12, 31),
                    ImdbRating = 8.4m,
                    Director = "Christopher Nolan",
                    Country = "USA",
                    StudioId = GetSid("Universal Pictures"),
                    AgeRating = AgeRating._16Plus,
                    Subtitles = true,
                    ImageUrl =
                        "https://upload.wikimedia.org/wikipedia/ru/b/bf/%D0%9E%D0%BF%D0%BF%D0%B5%D0%BD%D0%B3%D0%B5%D0%B9%D0%BC%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC_%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=keydELfWuMQ"
                },
                new()
                {
                    TitleOrg = "Dune: Part Two",
                    TitleUkr = "Дюна: Частина друга",
                    Description =
                        "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
                    Duration = 166,
                    ReleaseDate = CreateUtcDate(2024, 3, 1),
                    FinishDate = CreateUtcDate(2026, 11, 30),
                    ImdbRating = 8.6m,
                    Director = "Denis Villeneuve",
                    Country = "USA",
                    StudioId = GetSid("Legendary Entertainment"),
                    AgeRating = AgeRating._12Plus,
                    Subtitles = true,
                    ImageUrl =
                        "https://upload.wikimedia.org/wikipedia/uk/3/39/%D0%94%D1%8E%D0%BD%D0%B0_%D0%A7%D0%B0%D1%81%D1%82%D0%B8%D0%BD%D0%B0_%D0%B4%D1%80%D1%83%D0%B3%D0%B0.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=ygtS6q3EL7Y"
                },
                new()
                {
                    TitleOrg = "Interstellar",
                    TitleUkr = "Інтерстеллар",
                    Description =
                        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                    Duration = 169,
                    ReleaseDate = CreateUtcDate(2014, 11, 7),
                    FinishDate = CreateUtcDate(2026, 12, 31),
                    ImdbRating = 8.7m,
                    Director = "Christopher Nolan",
                    Country = "USA",
                    StudioId = GetSid("Paramount Pictures"),
                    AgeRating = AgeRating._12Plus,
                    Subtitles = true,
                    ImageUrl = "https://upload.wikimedia.org/wikipedia/ru/c/c3/Interstellar_2014.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=qcPfI0y7wRU"
                },
                new()
                {
                    TitleOrg = "Joker",
                    TitleUkr = "Джокер",
                    Description =
                        "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.",
                    Duration = 122,
                    ReleaseDate = CreateUtcDate(2019, 10, 4),
                    FinishDate = CreateUtcDate(2026, 6, 30),
                    ImdbRating = 8.4m,
                    Director = "Todd Phillips",
                    Country = "USA",
                    StudioId = GetSid("Warner Bros. Pictures"),
                    AgeRating = AgeRating._18Plus,
                    Subtitles = true,
                    ImageUrl =
                        "https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%94%D0%B6%D0%BE%D0%BA%D0%B5%D1%80_%28%D1%84%D0%B8%D0%BB%D1%8C%D0%BC_%D0%A2%D0%BE%D0%B4%D0%B4%D0%B0_%D0%A4%D0%B8%D0%BB%D0%BB%D0%B8%D0%BF%D1%81%D0%B0%29.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=jGfiPs9zuhE"
                },
                new()
                {
                    TitleOrg = "Barbie",
                    TitleUkr = "Барбі",
                    Description = "Barbie suffers a crisis that leads her to question her world and her existence.",
                    Duration = 114,
                    ReleaseDate = CreateUtcDate(2023, 7, 21),
                    FinishDate = CreateUtcDate(2026, 8, 15),
                    ImdbRating = 6.9m,
                    Director = "Greta Gerwig",
                    Country = "USA",
                    StudioId = GetSid("Warner Bros. Pictures"),
                    AgeRating = AgeRating._12Plus,
                    Subtitles = false,
                    ImageUrl = "https://upload.wikimedia.org/wikipedia/ru/4/4b/Barbie_2023_poster.jpeg",
                    TrailerUrl = "https://youtube.com/watch?v=8zIf0XvoL9Y"
                },
                new()
                {
                    TitleOrg = "Avatar: The Way of Water",
                    TitleUkr = "Аватар: Шлях води",
                    Description = "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
                    Duration = 192,
                    ReleaseDate = CreateUtcDate(2022, 12, 16),
                    FinishDate = CreateUtcDate(2026, 12, 31),
                    ImdbRating = 7.6m,
                    Director = "James Cameron",
                    Country = "USA",
                    StudioId = GetSid("20th Century Studios"),
                    AgeRating = AgeRating._12Plus,
                    Subtitles = true,
                    ImageUrl =
                        "https://upload.wikimedia.org/wikipedia/uk/4/4d/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%81%D1%82%D1%80%D1%96%D1%87%D0%BA%D0%B8_%C2%AB%D0%90%D0%B2%D0%B0%D1%82%D0%B0%D1%80._%D0%A8%D0%BB%D1%8F%D1%85_%D0%B2%D0%BE%D0%B4%D0%B8%C2%BB.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=E8Qe0vS_I3I"
                },
                new()
                {
                    TitleOrg = "The Batman",
                    TitleUkr = "Бетмен",
                    Description =
                        "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
                    Duration = 176,
                    ReleaseDate = CreateUtcDate(2022, 3, 4),
                    FinishDate = CreateUtcDate(2026, 5, 20),
                    ImdbRating = 7.8m,
                    Director = "Matt Reeves",
                    Country = "USA",
                    StudioId = GetSid("Warner Bros. Pictures"),
                    AgeRating = AgeRating._16Plus,
                    Subtitles = true,
                    ImageUrl = "https://upload.wikimedia.org/wikipedia/ru/b/b2/The_Batman_Poster.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=LTA-a5hOyks"
                },
                new()
                {
                    TitleOrg = "Spider-Man: Across the Spider-Verse",
                    TitleUkr = "Людина-павук: Крізь Всесвіт",
                    Description =
                        "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.",
                    Duration = 140,
                    ReleaseDate = CreateUtcDate(2023, 6, 2),
                    FinishDate = CreateUtcDate(2026, 10, 10),
                    ImdbRating = 8.6m,
                    Director = "Joaquim Dos Santos",
                    Country = "USA",
                    StudioId = GetSid("Sony Pictures"),
                    AgeRating = AgeRating._0Plus,
                    Subtitles = false,
                    ImageUrl =
                        "https://upload.wikimedia.org/wikipedia/uk/b/bc/%D0%9B%D1%8E%D0%B4%D0%B8%D0%BD%D0%B0_%D0%BF%D0%B0%D0%B2%D1%83%D0%BA%2C_%D0%9A%D1%80%D1%96%D0%B7%D1%8C_%D0%92%D1%81%D0%B5%D1%81%D0%B2%D1%96%D1%82.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=JKXPIDKvsiY"
                },
                new()
                {
                    TitleOrg = "Pulp Fiction",
                    TitleUkr = "Кримінальне чтиво",
                    Description =
                        "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
                    Duration = 154,
                    ReleaseDate = CreateUtcDate(1994, 10, 14),
                    FinishDate = CreateUtcDate(2026, 12, 31),
                    ImdbRating = 8.9m,
                    Director = "Quentin Tarantino",
                    Country = "USA",
                    StudioId = GetSid("Miramax"),
                    AgeRating = AgeRating._18Plus,
                    Subtitles = true,
                    ImageUrl = "https://upload.wikimedia.org/wikipedia/uk/8/82/Pulp_Fiction_cover.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=dDxXH9xAJ6Q"
                },
                new()
                {
                    TitleOrg = "Inception",
                    TitleUkr = "Початок",
                    Description =
                        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
                    Duration = 148,
                    ReleaseDate = CreateUtcDate(2010, 7, 16),
                    FinishDate = CreateUtcDate(2026, 12, 31),
                    ImdbRating = 8.8m,
                    Director = "Christopher Nolan",
                    Country = "USA",
                    StudioId = GetSid("Warner Bros. Pictures"),
                    AgeRating = AgeRating._12Plus,
                    Subtitles = true,
                    ImageUrl = "https://upload.wikimedia.org/wikipedia/ru/b/bc/Poster_Inception_film_2010.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=85Zz1CCXyDI"
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
                new() { Name = "IMAX Kyiv", Capacity = 100, Format = HallFormat.IMAX },
                new() { Name = "4DX Lviv", Capacity = 60, Format = HallFormat.REGULAR },
                new() { Name = "Dolby Atmos", Capacity = 80, Format = HallFormat.REGULAR },
                new() { Name = "VIP Lounge", Capacity = 30, Format = HallFormat.REGULAR },
                new() { Name = "Red Hall", Capacity = 50, Format = HallFormat._3D }
            };

            await context.Halls.AddRangeAsync(halls);
            await context.SaveChangesAsync();

            var seatsToAdd = new List<Seat>();
            foreach (var hall in halls)
            {
                var rows = (int)Math.Ceiling((double)hall.Capacity / 10);
                var seatsCreated = 0;

                for (var r = 1; r <= rows; r++)
                {
                    for (var s = 1; s <= 10; s++)
                    {
                        if (seatsCreated >= hall.Capacity) break;

                        seatsToAdd.Add(new Seat
                        {
                            HallId = hall.Id,
                            RowNumber = r,
                            SeatNumber = s,
                            SeatType = r == rows ? SeatType.Vip : (r == rows - 1 ? SeatType.Vip : SeatType.Regular)
                        });
                        seatsCreated++;
                    }
                }
            }

            await context.Seats.AddRangeAsync(seatsToAdd);
            await context.SaveChangesAsync();
        }

        #endregion

        #region Sessions + Prices

        if (!await context.Sessions.AnyAsync())
        {
            var movies = await context.Movies.ToListAsync();
            var halls = await context.Halls.ToListAsync();
            var random = new Random();

            var sessionsToAdd = new List<Session>();

            for (var day = 0; day < 7; day++)
            {
                var date = DateTime.UtcNow.Date.AddDays(day);

                foreach (var hall in halls)
                {
                    var timeSlots = new[] { 10, 15, 20 };

                    sessionsToAdd.AddRange(from hour in timeSlots
                        let movie = movies[random.Next(movies.Count)]
                        let startTime = date.AddHours(hour)
                        select new Session
                        {
                            MovieId = movie.Id, HallId = hall.Id, StartTime = startTime,
                            EndTime = startTime.AddMinutes(movie.Duration + 20)
                        });
                }
            }

            await context.Sessions.AddRangeAsync(sessionsToAdd);
            await context.SaveChangesAsync();

            var pricesToAdd = new List<Price>();
            foreach (var session in sessionsToAdd)
            {
                decimal basePrice = session.StartTime.Hour < 12 ? 150 : (session.StartTime.Hour < 18 ? 200 : 250);
                if (session.Hall.Format == HallFormat.IMAX) basePrice += 100;

                pricesToAdd.Add(new Price { SessionId = session.Id, SeatType = SeatType.Regular, Value = basePrice });
                pricesToAdd.Add(new Price
                    { SessionId = session.Id, SeatType = SeatType.Vip, Value = basePrice + 50 });
                pricesToAdd.Add(new Price { SessionId = session.Id, SeatType = SeatType.Vip, Value = basePrice + 120 });
            }

            await context.Prices.AddRangeAsync(pricesToAdd);
            await context.SaveChangesAsync();
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

        #region Bookings (Initial History)

        if (!await context.Bookings.AnyAsync())
        {
            var customers = await userManager.GetUsersInRoleAsync("Customer");
            var admin = await userManager.FindByEmailAsync(adminEmail);
            var allUsers = new List<ApplicationUser>(customers) { admin! };

            var sessions = await context.Sessions
                .Include(s => s.Prices)
                .Include(s => s.Hall).ThenInclude(h => h.Seats)
                .Where(s => s.StartTime < DateTime.UtcNow.AddDays(2))
                .ToListAsync();

            var regularDiscount = await context.Set<Discount>().FirstAsync(d => d.Type == DiscountType.REGULAR);
            var random = new Random();
            var bookingsToAdd = new List<Booking>();

            foreach (var session in sessions)
            {
                if (random.NextDouble() > 0.3) continue;

                var bookingsCount = random.Next(1, 5);
                var availableSeats = session.Hall.Seats.ToList();

                for (var i = 0; i < bookingsCount; i++)
                {
                    if (availableSeats.Count == 0) break;

                    var user = allUsers[random.Next(allUsers.Count)];
                    var seat = availableSeats[random.Next(availableSeats.Count)];
                    availableSeats.Remove(seat);

                    var price = session.Prices.FirstOrDefault(p => p.SeatType == seat.SeatType);
                    if (price == null) continue;

                    var booking = new Booking
                    {
                        ApplicationUserId = user.Id,
                        SessionId = session.Id,
                        BookingTime = DateTime.UtcNow,
                        ExpirationTime = DateTime.UtcNow.AddMinutes(15),
                        Status = BookingStatus.CONFIRMED,
                        PaymentIntentId = $"pi_mock_{Guid.NewGuid().ToString()[..8]}",
                        ConfirmationTime = DateTime.UtcNow
                    };

                    booking.Tickets.Add(new Ticket
                    {
                        SeatId = seat.Id,
                        PriceId = price.Id,
                        DiscountId = regularDiscount.Id,
                        FinalPrice = price.Value,
                        PurchaseTime = DateTime.UtcNow
                    });

                    bookingsToAdd.Add(booking);
                }
            }

            await context.Bookings.AddRangeAsync(bookingsToAdd);
            await context.SaveChangesAsync();
        }

        #endregion

        context.UseAuditing = true; // enabled logs listening
    }

    private static async Task SeedMovieRelationships(ApplicationContext context, List<Movie> movies)
    {
        if (await context.MovieGenres.AnyAsync() || await context.MovieActors.AnyAsync()) return;

        var genres = await context.Set<Genre>().ToListAsync();
        var actors = await context.Set<Actor>().ToListAsync();

        int GetG(string n) => genres.FirstOrDefault(g => g.Name == n)?.Id ?? genres.First().Id;
        int GetA(string n) => actors.FirstOrDefault(a => a.Name == n)?.Id ?? actors.First().Id;

        void AddMg(Movie m, params string[] g) =>
            context.MovieGenres.AddRange(g.Select(x => new MovieGenre { MovieId = m.Id, GenreId = GetG(x) }));

        void AddMa(Movie m, params string[] a) =>
            context.MovieActors.AddRange(a.Select(x => new MovieActor { MovieId = m.Id, ActorId = GetA(x) }));

        AddMg(movies[0], "Біографія", "Драма");
        AddMa(movies[0], "Cillian Murphy", "Robert Downey Jr.", "Matt Damon", "Emily Blunt");

        AddMg(movies[1], "Наукова фантастика", "Пригоди");
        AddMa(movies[1], "Timothée Chalamet", "Zendaya", "Rebecca Ferguson");

        AddMg(movies[2], "Наукова фантастика", "Драма");
        AddMa(movies[2], "Matthew McConaughey", "Anne Hathaway", "Jessica Chastain");

        AddMg(movies[3], "Драма", "Кримінал", "Трилер");
        AddMa(movies[3], "Joaquin Phoenix", "Robert De Niro");

        AddMg(movies[4], "Комедія", "Фентезі");
        AddMa(movies[4], "Margot Robbie", "Ryan Gosling");

        AddMg(movies[5], "Наукова фантастика", "Екшн", "Пригоди");
        AddMa(movies[5], "Sam Worthington", "Zoe Saldana");

        AddMg(movies[6], "Екшн", "Кримінал", "Драма");
        AddMa(movies[6], "Robert Pattinson", "Zoe Saldana");

        AddMg(movies[7], "Анімація", "Екшн", "Пригоди");
        AddMa(movies[7], "Shameik Moore", "Hailee Steinfeld");

        AddMg(movies[8], "Кримінал", "Драма");
        AddMa(movies[8], "Samuel L. Jackson", "John Travolta", "Uma Thurman");

        AddMg(movies[9], "Наукова фантастика", "Екшн", "Трилер");
        AddMa(movies[9], "Leonardo DiCaprio", "Tom Hardy", "Cillian Murphy");

        await context.SaveChangesAsync();
    }

    private static DateTime CreateUtcDate(int y, int m, int d) =>
        DateTime.SpecifyKind(new DateTime(y, m, d), DateTimeKind.Utc);
}