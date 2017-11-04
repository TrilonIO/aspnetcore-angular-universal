using System;
using AspCoreServer.Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;

namespace AspCoreServer
{
  public class Startup
  {
    public static void Main(string[] args)
    {
      var host = BuildWebHost(args);

      using (var scope = host.Services.CreateScope())
      {
        var services = scope.ServiceProvider;

        try
        {
          var context = services.GetRequiredService<SpaDbContext>();
          //context.Database.Migrate();
          DbInitializer.Initialize(context);
        }
        catch (Exception ex)
        {
          var logger = services.GetRequiredService<ILogger<Startup>>();
          logger.LogError(ex, "An error occurred seeding the DB.");
        }
      }

      host.Run();
    }

    public static IWebHost BuildWebHost(string[] args) =>
      WebHost.CreateDefaultBuilder(args)
        .UseStartup<Startup>()
        .Build();

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // Add framework services.
      services.AddMvc();
      services.AddNodeServices();

      var connectionStringBuilder = new SqliteConnectionStringBuilder { DataSource = "spa.db" };
      var connectionString = connectionStringBuilder.ToString();

      services.AddDbContext<SpaDbContext>(options =>
        options.UseSqlite(connectionString));

      // Register the Swagger generator, defining one or more Swagger documents
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new Info { Title = "Angular 5.0 Universal & ASP.NET Core advanced starter-kit web API", Version = "v1" });
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseStaticFiles();

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
        {
          HotModuleReplacement = true,
          HotModuleReplacementEndpoint = "/dist/"
        });
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
          c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        });

        // Enable middleware to serve swagger-ui (HTML, JS, CSS etc.), specifying the Swagger JSON endpoint.


        app.MapWhen(x => !x.Request.Path.Value.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase), builder =>
        {
          builder.UseMvc(routes =>
          {
            routes.MapSpaFallbackRoute(
              name: "spa-fallback",
              defaults: new { controller = "Home", action = "Index" });
          });
        });
      }
      else
      {
        app.UseMvc(routes =>
        {
          routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");

          routes.MapRoute(
            "Sitemap",
            "sitemap.xml",
            new { controller = "Home", action = "SitemapXml" });

          routes.MapSpaFallbackRoute(
            name: "spa-fallback",
            defaults: new { controller = "Home", action = "Index" });
        });
        app.UseExceptionHandler("/Home/Error");
      }
    }
  }
}
