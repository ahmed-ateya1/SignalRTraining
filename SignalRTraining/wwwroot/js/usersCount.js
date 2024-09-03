// In usersCount.js
var userCountConnection = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

// Update the rest of the code accordingly to use userCountConnection instead of connection
userCountConnection.on("updatedView", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerHTML = value.toString();
});

userCountConnection.on("updateUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersConnection");
    newCountSpan.innerHTML = value.toString();
});

function newWindowLoadedOnClient() {
    userCountConnection.invoke("OnWindowLoaded");
}

function fulfilled() {
    console.log("Connection started successfully");
    newWindowLoadedOnClient();
}

function rejected() {
    console.log("Connection failed, retrying in 5 seconds...");
    setTimeout(() => userCountConnection.start().then(fulfilled).catch(rejected), 5000);
}

// Start connection
userCountConnection.start().then(fulfilled).catch(rejected);
