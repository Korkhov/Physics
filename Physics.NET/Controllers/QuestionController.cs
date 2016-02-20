using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Physics.NET.Models;
using Newtonsoft.Json;

namespace Physics.NET.Controllers
{
    public class QuestionController : Controller
    {
        public Db _db { get; set; }

        public QuestionController()
        {
            _db = new Db();
        }

        [HttpGet]
        public string Count()
        {
            return JsonConvert.SerializeObject(new { result = _db.GetQuestionsCount() });
        }

        [HttpGet]
        public string CheckAnswer(string id, string text)
        {
            return JsonConvert.SerializeObject(new { result = _db.CheckAnswer(id, text) });
        }

        [HttpGet]
        public string GetIds()
        {
            return JsonConvert.SerializeObject(_db.GetQuestionsIds());
        }

        [HttpGet]
        public string GetById(string id)
        {
            return JsonConvert.SerializeObject(_db.GetQuestionById(id));
        }
    }
}
