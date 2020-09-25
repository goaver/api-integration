using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aver.ApiIntegration.Models
{
    public class AverCheckIdDocumentRequest
    {
        [JsonProperty(PropertyName = "docType")]
        public string DocType { get; set; }

        [JsonProperty(PropertyName = "side")]
        public string Side { get; set; }

        [JsonProperty(PropertyName = "fileName")]
        public string FileName { get; set; }

        [JsonProperty(PropertyName = "fileContent")]
        public string FileContent { get; set; }
    }
}
