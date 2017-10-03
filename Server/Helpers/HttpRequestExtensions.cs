using Asp2017.Server.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asp2017.Server.Helpers
{
    public static class HttpRequestExtensions
    {
    public static IRequest AbstractRequestInfo(this HttpRequest request)
    {

      IRequest requestSimplified = new IRequest();
      requestSimplified.cookies = request.Cookies;
      requestSimplified.headers = request.Headers;
      requestSimplified.host = request.Host;

      return requestSimplified;
    }

    public static async Task<RenderToStringResult> BuildPrerender(this HttpRequest Request)
    {
      var nodeServices = Request.HttpContext.RequestServices.GetRequiredService<INodeServices>();
      var hostEnv = Request.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>();

      var applicationBasePath = hostEnv.ContentRootPath;
      var requestFeature = Request.HttpContext.Features.Get<IHttpRequestFeature>();
      var unencodedPathAndQuery = requestFeature.RawTarget;
      var unencodedAbsoluteUrl = $"{Request.Scheme}://{Request.Host}{unencodedPathAndQuery}";

      // ** TransferData concept **
      // Here we can pass any Custom Data we want !

      // By default we're passing down Cookies, Headers, Host from the Request object here
      TransferData transferData = new TransferData();
      transferData.request = Request.AbstractRequestInfo();
      transferData.thisCameFromDotNET = "Hi Angular it's asp.net :)";
      // Add more customData here, add it to the TransferData class

      //Prerender now needs CancellationToken
      System.Threading.CancellationTokenSource cancelSource = new System.Threading.CancellationTokenSource();
      System.Threading.CancellationToken cancelToken = cancelSource.Token;

      // Prerender / Serialize application (with Universal)
      return await Prerenderer.RenderToString(
                "/",
                nodeServices,
                cancelToken,
                new JavaScriptModuleExport(applicationBasePath + "/ClientApp/dist/main-server"),
                unencodedAbsoluteUrl,
                unencodedPathAndQuery,
                transferData, // Our simplified Request object & any other CustommData you want to send!
                30000,
                Request.PathBase.ToString()
            );
    }
  }
}
