using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace RetailCliqSyncApp.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SetSession(string username)
        {
            if (!string.IsNullOrEmpty(username))
            {
                HttpContext.Session.SetString("Username", username);
                return Json(new { success = true });
            }

            return Json(new { success = false, message = "Username is missing." });
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }
    }
}
