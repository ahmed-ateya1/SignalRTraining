﻿let lbl_houseJoined = document.getElementById("lbl_houseJoined");


let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");


//create connection
var connectionHouse = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/houseGroup").build();

trigger_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("NotifySubscripe", "Gryffindor");
    event.preventDefault();
});
trigger_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("NotifySubscripe", "Hufflepuff");
    event.preventDefault();
});
trigger_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("NotifySubscripe", "Ravenclaw");
    event.preventDefault();
});
trigger_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("NotifySubscripe", "Slytherin");
    event.preventDefault();
});
btn_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Gryffindor");
    event.preventDefault();
});
btn_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Hufflepuff");
    event.preventDefault();
});
btn_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Ravenclaw");
    event.preventDefault();
});
btn_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Slytherin");
    event.preventDefault();
});


btn_un_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Gryffindor");
    event.preventDefault();
});
btn_un_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Hufflepuff");
    event.preventDefault();
});
btn_un_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Ravenclaw");
    event.preventDefault();
});
btn_un_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Slytherin");
    event.preventDefault();
});


connectionHouse.on("SubscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;
    if (hasSubscribed) {
        //subscribe to

        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
            default:
                break;
        }

        toastr.success(`You have Subscribed Successfully. ${houseName}`);
    }
    else {
        //unsubscribe
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
            default:
                break;
        }

        toastr.success(`You have Unsubscribed Successfully. ${houseName}`);
    }

});
connectionHouse.on("newMemberRemovedFromHouse", (value) => {
    toastr.success(`Memeber has unsubscribed to ${value}`);
});

connectionHouse.on("newMemberAddedToHouse", (value) => {
    toastr.success(`Memeber has subscribed to ${value}`);
});
connectionHouse.on("NotifyGroup", (houseName) => {
    toastr.success(`A new notification for ${houseName} has been launched.`);
});
//start connection
function fulfilled() {
    //do something on start
    console.log("Connection to User Hub Successful");
}
function rejected() {
    //rejected logs
} 

connectionHouse.start().then(fulfilled, rejected);