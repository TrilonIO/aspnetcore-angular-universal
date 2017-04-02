using AspCoreServer.Models;
using Microsoft.EntityFrameworkCore;

namespace AspCoreServer
{
    public class SpaDbContext : DbContext
    {
        public SpaDbContext(DbContextOptions<SpaDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
            //context.Database.Migrate();
        }

        //List of DB Models - Add your DB models here
        public DbSet<Users> User { get; set; }
    }
}
