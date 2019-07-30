using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Aver.ApiIntegration.Util
{
    /// <summary>
    /// 
    /// </summary>
    public enum ServiceAction
    {
        /// <summary>
        /// 
        /// </summary>
        GET,
        /// <summary>
        /// 
        /// </summary>
        POST
    }

    /// <summary>
    /// 
    /// </summary>
    public static class ServicesUtil
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="action"></param>
        /// <param name="apiKey"></param>
        /// <param name="url"></param>
        /// <param name="jsonContent"></param>
        /// <returns></returns>
        public static string CallService(ServiceAction action, string apiKey, string apiSecret, string url, object content)
        {
            //Ignore certificate errors
            ServicePointManager.ServerCertificateValidationCallback = (sender, certificate, chain, policyErrors) => true;
            string res = null;
            using (var client = new WebClient { Encoding = System.Text.Encoding.UTF8 })
            {
                //Set the content type header
                client.Headers[HttpRequestHeader.ContentType] = "application/json";

                //Set the basic auth header
                var authBytes = Encoding.ASCII.GetBytes(String.Format("{0}:{1}", apiKey, apiSecret));
                client.Headers[HttpRequestHeader.Authorization] = String.Format("Basic {0}", Convert.ToBase64String(authBytes));

                if (action == ServiceAction.GET)
                {
                    res = client.DownloadString(url);
                }
                else if (action == ServiceAction.POST)
                {
                    string data = "{}";
                    if (content != null)
                        data = JsonConvert.SerializeObject(content);

                    res = client.UploadString(url, data);
                }
            }

            return res;
        }
    }
}
