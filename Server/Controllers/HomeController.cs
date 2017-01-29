using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;

namespace Angular2Spa.Controllers
{ 
    public class HomeController : Controller
    {
        // public async Task<IActionResult> Index()
        public IActionResult Index()
        {

            // var nodeServices = Request.HttpContext.RequestServices.GetRequiredService<INodeServices>();
            // var hostEnv = Request.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>();

            // var applicationBasePath = hostEnv.ContentRootPath;
            // var requestFeature = Request.HttpContext.Features.Get<IHttpRequestFeature>();
            // var unencodedPathAndQuery = requestFeature.RawTarget;
            // var unencodedAbsoluteUrl = $"{Request.Scheme}://{Request.Host}{unencodedPathAndQuery}";

            // // Prerender / Serialize application (with Universal)
            // var prerenderResult = await Prerenderer.RenderToString(
            //     "/",
            //     nodeServices,
            //     new JavaScriptModuleExport("Client/bootstrap-server"),
            //     unencodedAbsoluteUrl,
            //     unencodedPathAndQuery,
            //     null,
            //     30000,
            //     Request.PathBase.ToString()
            // );

            // ViewData["SpaHtml"] = prerenderResult.Html;
            // ViewData["Title"] = prerenderResult.Globals["pageTitle"];

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
