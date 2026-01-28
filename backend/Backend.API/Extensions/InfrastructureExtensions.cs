using Backend.Data.Repositories;
using Backend.Domain.Interfaces;
using Backend.Data;

namespace Backend.API.Extensions;

public static class InfrastructureExtensions
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDatabaseServices(configuration);
        services.AddIdentityServices();

        services.AddScoped(
            typeof(IRepository<>),
            typeof(Repository<>)
        );

        return services;
    }
}
