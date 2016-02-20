using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.IO;

namespace Physics.NET.Models
{
    public class Db
    {
        public List<Question> GetAllQuestions()
        {
            string questions = File.ReadAllText(HttpContext.Current.Server.MapPath("~/questions.json"));
            return JsonConvert.DeserializeObject<List<Question>>(questions);
        }

        public Question GetQuestionById(string id)
        {
            return GetAllQuestions().FirstOrDefault(m => m.id == id);
        }

        public int GetQuestionsCount()
        {
            return GetAllQuestions().Count;
        }

        public List<string> GetQuestionsIds()
        {
            return (from qst in GetAllQuestions() select qst.id).ToList();
        }

        public bool CheckAnswer(string id, string text)
        {
            var qst = GetQuestionById(id);
            return qst.answers.FirstOrDefault(m => m.text == text).isCorrect;
        }
    }
}