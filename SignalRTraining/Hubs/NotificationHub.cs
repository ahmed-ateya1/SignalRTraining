﻿using Microsoft.AspNetCore.SignalR;

namespace SignalRTraining.Hubs
{
    public class NotificationHub : Hub
    {
        public static int notificationCounter = 0;
        public static List<string> messages = new List<string>();
        public async Task SendMessage(string message)
        {
            notificationCounter++;
            messages.Add(message);
            await LoadMessages();

        }
        public async Task LoadMessages()
        {
            await Clients.All.SendAsync("LoadNotification", messages , notificationCounter);
        }
    }
}
