var cloackSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");


// Create connection
var connection = new signalR.HubConnectionBuilder().withUrl("/hubs/deathlyHallow").build();

// Client receive update from hub
connection.on("updateDeathlyHallowyCount", (cloack,stone,wand) => {
   
    cloackSpan.innerHTML = cloack.toString();
    stoneSpan.innerHTML = stone.toString();
    wandSpan.innerHTML = wand.toString();

function fulfilled() {
    console.log("Connection started successfully");
}

function rejected() {
    console.log("Connection failed, retrying in 5 seconds...");
    setTimeout(() => connection.start().then(fulfilled).catch(rejected), 5000);
}

// Start connection
connection.start().then(fulfilled).catch(rejected);
