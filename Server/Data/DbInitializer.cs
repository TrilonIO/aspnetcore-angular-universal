using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AspCoreServer.Models;
using AspCoreServer;

namespace AspCoreServer.Data
{
    public static class DbInitializer
    {
        public static void Initialize(SpaDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.User.Any())
            {
                return;   // DB has been seeded
            }
            var users = new Users[]
            {
               new Users(){Name = "Mark Pieszak"},
               new Users(){Name = "Abrar Jahin"},
               new Users(){Name = "hakonamatata"},
               new Users(){Name = "LiverpoolOwen"},
               new Users(){Name = "Ketrex"},
               new Users(){Name = "markwhitfeld"},
               new Users(){Name = "daveo1001"},
               new Users(){Name = "paonath"},
               new Users(){Name = "nalex095"},
               new Users(){Name = "ORuban"},
               new Users(){Name = "Gaulomatic"}
            };

            foreach (Users s in users)
            {
                context.User.Add(s);
            }
            context.SaveChanges();
        }
    }
}
