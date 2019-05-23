using System;
using System.Threading.Tasks;
using AspCoreServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AspCoreServer.Data
{
    public static class SimpleContentEFStartup
    {
        public static async Task InitializeDatabaseAsync(IServiceProvider services)
        {
            var context = services.GetRequiredService<SpaDbContext>();


            if (await context.User.AnyAsync())
            {
                return; // DB has been seeded
            }
            var users = new User[] {
                new User () { Name = "Mark Pieszak" },
                new User () { Name = "Abrar Jahin" },
                new User () { Name = "hakonamatata" },
                new User () { Name = "LiverpoolOwen" },
                new User () { Name = "Ketrex" },
                new User () { Name = "markwhitfeld" },
                new User () { Name = "daveo1001" },
                new User () { Name = "paonath" },
                new User () { Name = "nalex095" },
                new User () { Name = "ORuban" },
                new User () { Name = "Gaulomatic" },
                new User () { Name = "GRIMMR3AP3R" }
            };
            await context.User.AddRangeAsync(users);

            await context.SaveChangesAsync();
        }
    }
}
