using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aver.ApiIntegration.Models
{
    public class AverCheckCreateResponse
    {
        [JsonProperty(PropertyName = "checkId")]
        public string CheckId { get; set; }

        [JsonProperty(PropertyName = "thirdPartyIdentifier")]
        public string ThirdPartyIdentifier { get; set; }

        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }
    }
}
