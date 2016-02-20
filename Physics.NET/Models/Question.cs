using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Physics.NET.Models
{
    public class Question
    {
        public string id { get; set; }
        public string text { get; set; }
        public List<Answer> answers { get; set; }

    }
}