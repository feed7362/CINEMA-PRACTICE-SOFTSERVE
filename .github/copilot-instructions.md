# Copilot Instructions for CINEMA-PRACTICE-SOFTSERVE

## Project Overview
This project is a cinema management application that consists of a backend API and a frontend interface. The backend is built using ASP.NET Core and Entity Framework, while the frontend utilizes React with TypeScript.

## Architecture
- **Backend**: The backend is structured into several layers:
  - **API Layer**: Contains controllers and API endpoints for handling requests.
  - **Services Layer**: Contains business logic and service classes (e.g., `MovieService`).
  - **Data Layer**: Manages data access through repositories (e.g., `Repository<TEntity>`).
  - **Domain Layer**: Contains domain entities (e.g., `Movie`, `Actor`, `Genre`).

- **Frontend**: The frontend is structured with components, services, and state management using React.

## Critical Developer Workflows
- **Building the Project**: Use the following command to build the backend:
  ```bash
  dotnet build backend/Backend.API/Backend.API.csproj
  ```
- **Running Migrations**: To apply database migrations, use:
  ```bash
  dotnet ef database update --project backend/Backend.Data/Backend.Data.csproj
  ```
- **Seeding Data**: The application seeds initial data on startup if the database is empty. Ensure the `SeedDataAsync` method in `DataSeeder.cs` is called during application startup.

## Project-Specific Conventions
- **Naming Conventions**: Use PascalCase for class names and camelCase for method parameters.
- **Error Handling**: Centralized error handling is implemented in middleware. Refer to `Program.cs` for configuration.

## Integration Points
- **Database**: The application uses PostgreSQL. Connection strings are defined in `appsettings.json`.
- **Identity Management**: ASP.NET Identity is used for user management. See `IdentityExtensions.cs` for configuration details.

## External Dependencies
- **Entity Framework Core**: For data access and migrations.
- **Npgsql**: PostgreSQL database provider for EF Core.
- **Swagger**: For API documentation and testing. Access it at `/swagger` after running the application.

## Communication Patterns
- **Service Communication**: Services communicate with repositories to fetch and manipulate data. For example, `MovieService` interacts with `IMovieRepository` to retrieve movie data.

## Examples
- **Creating a New Movie**: Use the `MovieService` to create a new movie entry, ensuring to validate input data according to the defined entity constraints.

## Conclusion
These instructions should help AI agents understand the architecture, workflows, and conventions of the CINEMA-PRACTICE-SOFTSERVE project. For further assistance, refer to the README files in both the backend and frontend directories.