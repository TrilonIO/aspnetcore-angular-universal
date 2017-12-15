using Asp2017.Server.Helpers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using System;
using Asp2017.Server.Models;
using System.Text.RegularExpressions;

namespace AspCoreServer.Controllers
{
  public class HomeController : Controller
  {
    [HttpGet]
    public async Task<IActionResult> Index()
    {

      await Task.CompletedTask; // Placeholder to disregard warnings for now.
      // var prerenderResult = await Request.BuildPrerender();

      // ViewData["SpaHtml"] = prerenderResult.Html; // our <app-root /> from Angular
      // ViewData["Title"] = prerenderResult.Globals["title"]; // set our <title> from Angular
      // ViewData["Styles"] = prerenderResult.Globals["styles"]; // put styles in the correct place
      // ViewData["Scripts"] = prerenderResult.Globals["scripts"]; // scripts (that were in our header)
      // ViewData["Meta"] = prerenderResult.Globals["meta"]; // set our <meta> SEO tags
      // ViewData["Links"] = prerenderResult.Globals["links"]; // set our <link rel="canonical"> etc SEO tags
      // ViewData["TransferData"] = prerenderResult.Globals["transferData"]; // our transfer data set to window.TRANSFER_CACHE = {};

      return View();
    }

    const string SITEMAP_XML =
@"<?xml version=""1.0"" encoding=""utf-8""?>
<sitemapindex xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">
<sitemap>
  <loc>/home</loc>
  <lastmod>{0}</lastmod>
</sitemap>
<sitemap>
  <loc>/counter</loc>
  <lastmod>{0}</lastmod>
</sitemap>
</sitemapindex>
";

    [HttpGet]
    [Route("sitemap.xml")]
    public IActionResult SitemapXml()
      => Content(string.Format(SITEMAP_XML, DateTime.Now.ToString("yyyy-MM-dd")));

    public IActionResult Error()
    {
      return View();
    }
  }
}
