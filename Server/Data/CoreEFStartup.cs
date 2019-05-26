using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace AspCoreServer.Data
{
    public static class CoreEFStartup
    {
        public static async Task InitializeDatabaseAsync(IServiceProvider services)
        {            
            var context = services.GetRequiredService<SpaDbContext>();

            await context.Database.EnsureCreatedAsync();
        }

    }
}
