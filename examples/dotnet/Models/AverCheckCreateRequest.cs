using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aver.ApiIntegration.Models
{
    public class AverCheckCreateRequest
    {
        [JsonProperty(PropertyName = "uniqueId")]
        public string UniqueId { get; set; }

        [JsonProperty(PropertyName = "groupId")]
        public string GroupId { get; set; }

        [JsonProperty(PropertyName = "returnUrl")]
        public string ReturnUrl { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }
    }
}
