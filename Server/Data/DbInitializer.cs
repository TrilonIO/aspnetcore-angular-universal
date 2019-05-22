﻿using System;
using System.Linq;
using AspCoreServer;
using AspCoreServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AspCoreServer.Data {
    public static class DbInitializer {
        public static void Initialize (SpaDbContext context) {
            context.Database.EnsureCreated ();

            if (context.User.Any ()) {
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

            foreach (var s in users) {
                context.User.Add (s);
            }
            context.SaveChanges ();
        }
    }
}
