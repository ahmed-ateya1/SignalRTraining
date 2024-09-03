using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRTraining.Hubs;
using SignalRTraining.Models;
using System.Diagnostics;

namespace SignalRTraining.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowRaceHub> _hallowRace;
        public HomeController(ILogger<HomeController> logger , IHubContext<DeathlyHallowRaceHub> hallowRace)
        {
            _logger = logger;
            _hallowRace = hallowRace;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Notification()
        {
            return View();
        }
        public IActionResult HouseGroup()
        {
            return View();
        }

        public IActionResult DeathlyHallowRace()
        {
            return View();
        }
        public IActionResult BasicChat()
        {
            return View();
        }
        public async Task<IActionResult> DeathlyHallows(string type)
        {
            if (SD.DeathlyHallowRace.ContainsKey(type))
            {
                SD.DeathlyHallowRace[type]++;
            }
            await _hallowRace.Clients.All.SendAsync("updateDeathlyHallowyCount",
                SD.DeathlyHallowRace[SD.Cloak],
                SD.DeathlyHallowRace[SD.Stone],
                SD.DeathlyHallowRace[SD.Wand]
                );
            return Accepted();
        }
    }
}
