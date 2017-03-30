using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;

namespace AspCoreServer.Controllers
{
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        /*
        private IHubContext _hub;
        private ILogger<TestController> _logger;
        private string uploadDirectory;

        public TestController(ILogger<TestController> logger, IHostingEnvironment environment, IConnectionManager connectionManager) //, IHostingEnvironment environment
        {
            _hub = connectionManager.GetHubContext<ChatHub>();
            _logger = logger;
            IHostingEnvironment  _environment = environment;
            var location = System.Reflection.Assembly.GetEntryAssembly().Location;
            uploadDirectory = _environment.WebRootPath + $@"/{"uploads"}";
            Directory.CreateDirectory(uploadDirectory);      //Should be in startup
        }
        */

        private static string[] Names = new[]
        {
            "Mark Pieszak", "Angular mcAngular", "Redux-man", "Nintendo"
        };

        [HttpGet("[action]")]
        public IEnumerable<SampleData> Users()
        {
            var random = new Random();

            //Calling a hub function
            //_hub.Clients.All.Send("REST Working");

            return Enumerable.Range(1, 5).Select(index => new SampleData
            {
                ID = random.Next(0, 2000),
                Name = Names[random.Next(Names.Length)]
            });
        }

        public class SampleData
        {
            public int ID { get; set; }
            public string Name { get; set; }
        }
    }
}
