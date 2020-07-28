var socket;
var port;
var myID;
var code;

setupWebSockets(); //connect to the websocket server and establish functions for events

//Connect to Socket server
function setupWebSockets() {
    try {
        port = (process.env.PORT || 4000);
    } catch {}
    socket = io.connect(port);

    socket.on('userID', userID); //if we receive a 'userID' socket, execute userID(), the Event Name and function do not have to have the same names 
    socket.on('newData', newData); //if we receive a 'newData' socket, execute newData() 
    socket.on('roomsInUse', roomsInUse);
    socket.on('playerNames', playerNames);
}

//Sets which player we are
function userID(data) {
    myID = data; //set our ID to either 0,1,2,3 
    console.log("My ID is: " + myID);
}

//runs when we get socket from other players
function newData(data) {

    //changes HTML for table for cooresponding player
    document.getElementsByClassName("playerChoices")[data.player].innerHTML = "Choice " + data.choice;
    console.log("Got data from player " + data.player);
}


//Recieve list of public rooms
function roomsInUse(data) {
    console.log("Rooms: " + data);
    var gameButtons = "";
    for (let i = 0; i < data.length; i++) {
        gameButtons += '<button onClick="joinPublicGame(';
        gameButtons += "'";
        gameButtons += data[i];
        gameButtons += "'";
        gameButtons += ')">';
        gameButtons += data[i];
        gameButtons += "</button>";
    }
    if (data.length == 0) {
        document.getElementById("publicRoom").innerHTML = ""
    } else {
        document.getElementById("publicRoom").innerHTML = "Public Games Available:"

    }
    document.getElementById("publicGames").innerHTML = gameButtons;
}

//Recieve list of player names in Room
function playerNames(data) {
    playerNames = data;

    //Display player names on webpage
    document.getElementById("playersInRoom").innerHTML = "Players: " + playerNames[0] + " " +
        playerNames[1] + " " +
        playerNames[2] + " " +
        playerNames[3] + " " +
        " are online. You are Player " + (myID + 1) + ".";

    //Send our current choice so new players have them 
    newMove();
    console.log("Players: " + playerNames);
}

//Create New Room Code
function startNewGame() {

    //don't submit data if we have no name
    if (document.getElementById("playerNameInput").value == "") {
        document.getElementById("playerNameInput").classList.add("important");
    } else {

        //Get Player's Name
        let player = document.getElementById("playerNameInput").value;
        code = "";

        //Generate 4 Letter Code
        for (let i = 0; i < 4; i++) {
            code += String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }

        //Update our webpage with this code
        document.getElementById("showRoomCode").innerHTML = "Room Code: " + code;

        //Make Room Public by Default (but we can make this false)
        let gamePublic = true;

        //create an object that holds all the data we want to send in our websocket
        let d = {
            room: code,
            player: player,
            public: gamePublic
        }

        //send a socket to make new room
        socket.emit('joinRoom', d);

        hideJoinScreen();
    }
}

//Join Room from Code
function joinGame() {

    //don't submit data if we have no name
    if (document.getElementById("playerNameInput").value == "") {
        document.getElementById("playerNameInput").classList.add("important");
    }
    //don't submit if we didn't input room code
    else if (document.getElementById("roomCode").value == "") {
        document.getElementById("roomCode").classList.add("important");
    } else {

        //get room code and capitalize
        code = document.getElementById("roomCode").value.toUpperCase();
        //get player's name
        let player = document.getElementById("playerNameInput").value;

        //Update our webpage with this code
        document.getElementById("showRoomCode").innerHTML = "Room Code: " + code;

        //create an object that holds all the data we want to send in our websocket
        let d = {
            room: code,
            player: player
        }

        //send socket to join specific room
        socket.emit('joinRoom', d);
        hideJoinScreen();
    }
}


//Join Room from Button
function joinPublicGame(data) {

    //don't submit data if we have no name
    if (document.getElementById("playerNameInput").value == "") {
        document.getElementById("playerNameInput").classList.add("important");
    } else {
        //get code from value of button
        code = data;
        //get player's name
        let player = document.getElementById("playerNameInput").value;

        //Update our webpage with this code
        document.getElementById("showRoomCode").innerHTML = "Room Code: " + code;

        //create an object that holds all the data we want to send in our websocket
        let d = {
            room: code,
            player: player
        }

        //send socket to join specific room
        socket.emit('joinRoom', d);
        hideJoinScreen();

    }
}

//Hide Join Screen and Display Game Screen
function hideJoinScreen() {

    //show our game and hide the initial screen
    document.getElementById("joinScreen").style.display = "none";
    document.getElementById("game").style.display = "block";
}

//Leave Room, Hide Game Screen and Display Game Screen
function leaveGame() {

    //send socket with Event Name "leaveRoom"
    socket.emit('leaveRoom', myID);

    //hide the game and show the initial joining screen
    document.getElementById("joinScreen").style.display = "block";
    document.getElementById("game").style.display = "none";
}

//execute this function when we change our select to send to other players
function newMove() {

    //get value from select
    let choice = document.getElementById("myChoices").value;

    //Update our own choice in the table
    document.getElementsByClassName("playerChoices")[myID].innerHTML = "Choice " + choice;

    //create an object that holds all the data that we want to send in our websocket
    data = {
        player: myID,
        choice: choice
    }

    //send that socket with the Event Name "newData" to our server. 
    //We can have different event names to handle the data differently
    socket.emit('newData', data);
    console.log("Sending: " + choice)
}