using Microsoft.AspNetCore.SignalR;

namespace SignalRTraining.Hubs
{
    public class DeathlyHallowRaceHub : Hub
    {
        public Dictionary<string , int> GetRaceStatus()
        {
            return SD.DeathlyHallowRace;
        }
    }
}
