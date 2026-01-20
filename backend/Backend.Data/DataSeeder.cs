using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public static class DataSeeder
{
    public static async Task SeedDataAsync(ApplicationContext context)
    {
        #region Studios
        if (!await context.Set<Studio>().AnyAsync())
        {
            context.Set<Studio>().AddRange(
                new Studio { StudioName = "Universal Pictures" },
                new Studio { StudioName = "Warner Bros. Pictures" },
                new Studio { StudioName = "Legendary Entertainment" },
                new Studio { StudioName = "Paramount Pictures" },
                new Studio { StudioName = "20th Century Studios" },
                new Studio { StudioName = "A24" },
                new Studio { StudioName = "Columbia Pictures" },
                new Studio { StudioName = "Marvel Studios" },
                new Studio { StudioName = "Pixar Animation Studios" },
                new Studio { StudioName = "Netflix Studios" },
                new Studio { StudioName = "Sony Pictures" },
                new Studio { StudioName = "Lionsgate" }
            );
            await context.SaveChangesAsync();
        }
        #endregion

        #region Genres
        if (!await context.Set<Genre>().AnyAsync())
        {
            context.Set<Genre>().AddRange(
                new Genre { GenreName = "Наукова фантастика" },
                new Genre { GenreName = "Драма" },
                new Genre { GenreName = "Біографія" },
                new Genre { GenreName = "Екшн" },
                new Genre { GenreName = "Трилер" },
                new Genre { GenreName = "Пригоди" },
                new Genre { GenreName = "Кримінал" },
                new Genre { GenreName = "Фентезі" },
                new Genre { GenreName = "Жахи" },
                new Genre { GenreName = "Комедія" },
                new Genre { GenreName = "Романтика" },
                new Genre { GenreName = "Анімація" },
                new Genre { GenreName = "Містика" }
            );
            await context.SaveChangesAsync();
        }
        #endregion

        #region Actors
        if (!await context.Set<Actor>().AnyAsync())
        {
            context.Set<Actor>().AddRange(
                new Actor { ActorName = "Кілліан Мерфі" },
                new Actor { ActorName = "Тімоті Шаламе" },
                new Actor { ActorName = "Зендея" },
                new Actor { ActorName = "Роберт Дауні-молодший" },
                new Actor { ActorName = "Хоакін Фенікс" },
                new Actor { ActorName = "Меттью Макконагі" },
                new Actor { ActorName = "Енн Гетевей" },
                new Actor { ActorName = "Леонардо Ді Капріо" },
                new Actor { ActorName = "Марго Роббі" },
                new Actor { ActorName = "Бред Пітт" },
                new Actor { ActorName = "Крістіан Бейл" },
                new Actor { ActorName = "Том Гарді" },
                new Actor { ActorName = "Емма Стоун" },
                new Actor { ActorName = "Раян Гослінг" },
                new Actor { ActorName = "Кіану Рівз" }
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
                    MovieTitleORG = "Oppenheimer",
                    MovieTitleUKR = "Оппенгеймер",
                    Description = "Історія людини, яка створила атомну бомбу.",
                    Duration = 180,
                    ReleaseDate = CreateUtcDate(2023, 7, 21),
                    FinishDate = CreateUtcDate(2026, 12, 31),
                    IMDBRating = 8.4m,
                    Director = "Крістофер Нолан",
                    Country = "США",
                    StudioId = studios.First(s => s.StudioName == "Universal Pictures").Id,
                    AgeRating = AgeRating._16Plus,
                    Subtitles = true
                },
                new()
                {
                    MovieTitleORG = "Dune: Part Two",
                    MovieTitleUKR = "Дюна: Частина друга",
                    Description = "Пол Атрідес стає лідером фрименів.",
                    Duration = 166,
                    ReleaseDate = CreateUtcDate(2024, 3, 1),
                    FinishDate = CreateUtcDate(2026, 11, 30),
                    IMDBRating = 8.6m,
                    Director = "Дені Вільнев",
                    Country = "США, Канада",
                    StudioId = studios.First(s => s.StudioName == "Legendary Entertainment").Id,
                    AgeRating = AgeRating._12Plus,
                    Subtitles = true
                },
                new()
                {
                    MovieTitleORG = "Interstellar",
                    MovieTitleUKR = "Інтерстеллар",
                    Description = "Подорож крізь простір і час заради людства.",
                    Duration = 169,
                    ReleaseDate = CreateUtcDate(2014, 11, 7),
                    FinishDate = CreateUtcDate(2026, 12, 31),
                    IMDBRating = 8.7m,
                    Director = "Крістофер Нолан",
                    Country = "США",
                    StudioId = studios.First(s => s.StudioName == "Paramount Pictures").Id,
                    AgeRating = AgeRating._12Plus,
                    Subtitles = true
                },
                new()
                {
                    MovieTitleORG = "Joker",
                    MovieTitleUKR = "Джокер",
                    Description = "Психологічна історія становлення лиходія.",
                    Duration = 122,
                    ReleaseDate = CreateUtcDate(2019, 10, 4),
                    FinishDate = CreateUtcDate(2026, 6, 30),
                    IMDBRating = 8.5m,
                    Director = "Тодд Філліпс",
                    Country = "США",
                    StudioId = studios.First(s => s.StudioName == "Warner Bros. Pictures").Id,
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
                new MovieGenre { MovieId = m.Id, GenreId = genres.First(y => y.GenreName == x).Id }));

        void AddMA(Movie m, params string[] a) =>
            context.MovieActors.AddRange(a.Select(x =>
                new MovieActor { MovieId = m.Id, ActorId = actors.First(y => y.ActorName == x).Id }));

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
