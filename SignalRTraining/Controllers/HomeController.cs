using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SignalRTraining.Data;
using SignalRTraining.Hubs;
using SignalRTraining.Models;
using System.Diagnostics;

namespace SignalRTraining.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowRaceHub> _hallowRace;
        private readonly IHubContext<OrderHub> _order;
        private readonly ApplicationDbContext _context;
        public HomeController(ILogger<HomeController> logger ,
            IHubContext<DeathlyHallowRaceHub> hallowRace ,
            IHubContext<OrderHub> order,
            ApplicationDbContext context)
        {
            _logger = logger;
            _hallowRace = hallowRace;
            _context = context;
            _order = order;
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
        [ActionName("Order")]
        public async Task<IActionResult> Order()
        {
            string[] name = { "Bhrugen", "Ben", "Jess", "Laura", "Ron" };
            string[] itemName = { "Food1", "Food2", "Food3", "Food4", "Food5" };

            Random rand = new Random();
            // Generate a random index less than the size of the array.  
            int index = rand.Next(name.Length);

            Order order = new Order()
            {
                Name = name[index],
                ItemName = itemName[index],
                Count = index
            };

            return View(order);
        }

        [ActionName("Order")]
        [HttpPost]
        public async Task<IActionResult> OrderPost(Order order)
        {

            _context.Orders.Add(order);
            _context.SaveChanges();
            await _order.Clients.All.SendAsync("newOrder");
            return RedirectToAction(nameof(Order));
        }
        [ActionName("OrderList")]
        public async Task<IActionResult> OrderList()
        {
            return View();
        }
        [HttpGet]
        public IActionResult GetAllOrder()
        {
            var productList = _context.Orders.ToList();
            return Json(new { data = productList });
        }

    }
}
