var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");


// Create connection
var connectiondeathlyHallow = new signalR.HubConnectionBuilder().withUrl("/hubs/deathlyHallow").build();

// Client receive update from hub
connectiondeathlyHallow.on("updateDeathlyHallowyCount", (cloak, stone, wand) => {

    cloakSpan.innerHTML = cloak.toString();
    stoneSpan.innerHTML = stone.toString();
    wandSpan.innerHTML = wand.toString();

});
function fulfilled() {
    connectiondeathlyHallow.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.innerHTML = raceCounter.cloak.toString();
        stoneSpan.innerHTML = raceCounter.stone.toString();
        wandSpan.innerHTML = raceCounter.wand.toString();
    });
    console.log("Connection started successfully");
}

function rejected() {
    console.log("Connection failed, retrying in 5 seconds...");
    setTimeout(() => connectiondeathlyHallow.start().then(fulfilled).catch(rejected), 5000);
}

// Start connection
connectiondeathlyHallow.start().then(fulfilled).catch(rejected);