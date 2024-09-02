// Create connection
var connection = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

// Client receive update from hub
connection.on("updatedView", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerHTML = value.toString();
});

connection.on("updateUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersConnection");
    newCountSpan.innerHTML = value.toString();
});

// Client JS calls the method in hub
function newWindowLoadedOnClient() {
    connection.send("OnWindowLoaded");
}

function fulfilled() {
    console.log("Connection started successfully");
    newWindowLoadedOnClient();
}

function rejected() {
    console.log("Connection failed, retrying in 5 seconds...");
    setTimeout(() => connection.start().then(fulfilled).catch(rejected), 5000);
}

// Start connection
connection.start().then(fulfilled).catch(rejected);
