using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp2017.Server.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.Extensions.DependencyInjection;

namespace Asp2017.Server.Helpers {
    public static class HttpRequestExtensions {
        public static IRequest AbstractRequestInfo(this HttpRequest request) => new IRequest()
        {
            cookies = request.Cookies,
            headers = request.Headers,
            host = request.Host
        };

        public static async Task<RenderToStringResult> BuildPrerender(this HttpRequest request) =>
            // Prerender / Serialize application (with Universal)
            await Prerenderer.RenderToString(
                "/",
                request.HttpContext.RequestServices.GetRequiredService<INodeServices>(),
                new System.Threading.CancellationTokenSource().Token,
                new JavaScriptModuleExport(request.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>().ContentRootPath + "/ClientApp/dist/main-server"),
                $"{request.Scheme}://{request.Host}{request.HttpContext.Features.Get<IHttpRequestFeature>().RawTarget}",
                request.HttpContext.Features.Get<IHttpRequestFeature>().RawTarget,
                // ** TransferData concept **
                // Here we can pass any Custom Data we want !
                // By default we're passing down Cookies, Headers, Host from the Request object here
                new TransferData
                {
                    request = request.AbstractRequestInfo(),
                    thisCameFromDotNET = "Hi Angular it's asp.net :)"
                }, // Our simplified Request object & any other CustommData you want to send!
                30000,
                request.PathBase.ToString()
            );
    }
}
