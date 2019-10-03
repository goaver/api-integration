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
            var authUrl = String.Format("{0}/auth/token", apiConfig["Url"]);
            var checkCreateUrl = String.Format("{0}/check/create", apiConfig["Url"]);
            var key = apiConfig["Key"];
            var secret = apiConfig["Secret"];
            var groupId = apiConfig["GroupId"]; 

            //Get the token from basic auth
            var authRes = ServicesUtil.CallService(ServiceAction.GET, authUrl, null, key, secret);
            var token = JsonConvert.DeserializeObject<AverAuthResponse>(authRes);


            //Build the check create request
            var checkCreateRequest = new AverCheckCreateRequest
            {
                ThirdPartyIdentifier = Guid.NewGuid().ToString(),
                GroupId = groupId,  //You can use different groups within your organization if desired, we just have a default in config we're using
                EmailAddress = "someuser@user.com"
                //ReturnUrl = "https://www.yoursite.com/enrollmentcomplete" //Optional, this will redirect after in-proc enrollment is complete
                //Language = "en" //Optional, this will default the language, default is always English and the user has the option to toggle language during the process
            };

            //Create our check
            var checkRes = ServicesUtil.CallService(ServiceAction.POST, checkCreateUrl, checkCreateRequest, null, null, token.Token);
            var check = JsonConvert.DeserializeObject<AverCheckCreateResponse>(checkRes);

            //Return the url for the user to continue
            ViewData["Url"] = check.Url;

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
