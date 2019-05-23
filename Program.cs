using AspCoreServer;
using AspCoreServer.Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Threading.Tasks;

public class Program
{
    public static async Task Main(string[] args)
    {
        var host = BuildWebHost(args);
        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;

            try
            {
                await EnsureDataStorageIsReady(services);

            } catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred while seeding the database.");
            }
        }

        host.Run();
    }
    public static IWebHost BuildWebHost(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
        .UseKestrel()
        .UseContentRoot(Directory.GetCurrentDirectory())
        .UseIISIntegration()
        .UseStartup<Startup>()
        .Build();

    private static async Task EnsureDataStorageIsReady(IServiceProvider services)
    {
        await CoreEFStartup.InitializeDatabaseAsync(services);
        await SimpleContentEFStartup.InitializeDatabaseAsync(services);
        await LoggingEFStartup.InitializeDatabaseAsync(services);
    }
}
