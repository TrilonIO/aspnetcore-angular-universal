using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Antiforgery;

using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using AspCoreServer.Models;
using Microsoft.AspNetCore.Http;

using Microsoft.AspNetCore.NodeServices;

namespace AspCoreServer
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            if (env.IsDevelopment())
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Monitor for performance and usage
            services.AddApplicationInsightsTelemetry(Configuration);

            //Add DB Context
            var connectionStringBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder { DataSource = "spa.db" };
            var connectionString = connectionStringBuilder.ToString();
            services.AddDbContext<SpaDbContext>(options =>
                options.UseSqlite(connectionString));

            // Add framework services.
            services.AddMvc();
            services.AddMemoryCache();

            services.AddNodeServices();

            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");

            //Adding SignalR Service
            services.AddSignalR(options => {
                services.AddMemoryCache();
                var transports = options.Transports;
                options.Hubs.EnableDetailedErrors = true;
                transports.DisconnectTimeout = TimeSpan.FromSeconds(6);
                transports.KeepAlive = TimeSpan.FromSeconds(2);
                transports.TransportConnectTimeout = TimeSpan.FromSeconds(20);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IAntiforgery antiforgery)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            //SignalR Config		
            app.UseSignalR();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //Adding Browser Link support for error catching live
                app.UseBrowserLink();

                // Webpack middleware setup
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });

                //Adding Seeder/Test Data
                AddTestData(app.ApplicationServices.GetService<SpaDbContext>());
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            // CSRF / XSRF Token
            app.Use(async (context, next) =>
            {
                if (string.Equals(context.Request.Path.Value, "/", StringComparison.OrdinalIgnoreCase))
                {
                    var tokens = antiforgery.GetAndStoreTokens(context);

                    context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions() { 
                        HttpOnly = false
                    });
                }
                await next.Invoke();
            });

            app.UseStaticFiles();

            //  ** MVC / WebAPI Routing & default SPA fallback Routing
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }

        private static void AddTestData(SpaDbContext context)
        {
            Users testUser = new Users
            {
                Name = "Abrar Jahin"
            };
            context.User.Add(testUser);

            context.SaveChanges();
        }
    }
}
