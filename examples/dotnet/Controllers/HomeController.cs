using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Aver.ApiIntegration.Models;
using Aver.ApiIntegration.Util;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

namespace Aver.ApiIntegration.Controllers
{
    public class HomeController : Controller
    {
        private IConfiguration _configuration;
        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CreateCheck()
        {
            //Get the API config
            var apiConfig = _configuration.GetSection("AverApi");
            var url = String.Format("{0}/CheckCreateToken", apiConfig["Url"]);
            var key = apiConfig["Key"];
            var secret = apiConfig["Secret"];
            var groupId = apiConfig["GroupId"]; 

            //Build the check create request
            var checkRequest = new AverCheckCreateRequest
            {
                UniqueId = Guid.NewGuid().ToString(),
                GroupId = groupId,  //You can use different groups within your organization if desired, we just have a default in config we're using
                //Email = "someuser@user.com",  //Optional, this will default / force the e-mail to be verified by the user
                //ReturnUrl = "https://www.yoursite.com/enrollmentcomplete" //Optional, this will redirect after in-proc enrollment is complete
            };

            //Get the token from basic auth
            string res = ServicesUtil.CallService(ServiceAction.POST, key, secret, url, checkRequest);
            var response = JsonConvert.DeserializeObject<AverCheckCreateResponse>(res);

            ViewData["Token"] = response.Token;

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
