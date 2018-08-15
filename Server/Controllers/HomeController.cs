using Asp2017.Server.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AspCoreServer.Controllers
{
    public class HomeController : Controller {
        protected readonly IHostingEnvironment HostingEnvironment;
        public HomeController(IHostingEnvironment hostingEnv) => this.HostingEnvironment = hostingEnv;

        [HttpGet]
        public async Task<IActionResult> Index () {
            var prerenderResult = await this.Request.BuildPrerender ();

            this.ViewData["SpaHtml"] = prerenderResult.Html; // our <app-root /> from Angular
            this.ViewData["Title"] = prerenderResult.Globals["title"]; // set our <title> from Angular
            this.ViewData["Styles"] = prerenderResult.Globals["styles"]; // put styles in the correct place
            this.ViewData["Scripts"] = prerenderResult.Globals["scripts"]; // scripts (that were in our header)
            this.ViewData["Meta"] = prerenderResult.Globals["meta"]; // set our <meta> SEO tags
            this.ViewData["Links"] = prerenderResult.Globals["links"]; // set our <link rel="canonical"> etc SEO tags
            this.ViewData["TransferData"] = prerenderResult.Globals["transferData"]; // our transfer data set to window.TRANSFER_CACHE = {};
            if (!this.HostingEnvironment.IsDevelopment ()) {
                this.ViewData["ServiceWorker"] = "<script>'serviceWorker'in navigator&&navigator.serviceWorker.register('/serviceworker')</script>";
            }

            return View ();
        }

        [HttpGet]
        [Route("sitemap.xml")]
        public IActionResult SitemapXml() => Content($@"<?xml version=""1.0"" encoding=""utf-8""?>
                 <urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">
                    <url>
                        <loc>http://localhost:4251/home</loc>
                        <lastmod>{ DateTime.Now.ToString("yyyy-MM-dd")}</lastmod>
                    </url>
                    <url>
                        <loc>http://localhost:4251/counter</loc>
                        <lastmod>{DateTime.Now.ToString("yyyy-MM-dd")}</lastmod>
                    </url>
                    </urlset>", "text/xml");

        public IActionResult Error() => View();
    }
}
