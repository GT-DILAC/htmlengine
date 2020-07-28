var maxNumberOfPlayers = 4; //How many players do we want in each game?
var usersInRoom = []; //two dimensional array, first array is room code, second is player ID, keeps track of which player slots are full
var numUsersInRoom = []; //1D array 
var playerNamesInRoom = []; //2D array of player names corresponding to usersInRoom
var roomsInUse = []; //1D array of public rooms to show on lobby screen


//Starting the server 
var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 4000); //we can see the website at localhost:4000 when server is running
app.use(express.static('public')); //everything in this folder is now available at localhost:4000
console.log("My socket server is running");
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);



//Handling when a browser connects to the server
function newConnection(socket) {
    var thisID;
    console.log('new connection: ' + socket.id);
    socket.emit('roomsInUse', roomsInUse); //send a socket so the window knows available rooms

    //all of the functions that get executed when we get specific sockets
    socket.on('newData', newData); //when we get a socket on "newData", execute function newData(). These could have different names, I'm just lazy
    socket.on('joinRoom', joinRoom);
    socket.on('leaveRoom', leaveRoom);
    socket.on('disconnect', leaveRoom); //if the browser gets disconnected this code runs


    function joinRoom(data) {
        var thisPlayer = data.player;
        socket.join(data.room);
        socket.myRoom = data.room;

        //if no one is the room, get all our variables initialized for it 
        if (!usersInRoom[data.room]) {
            usersInRoom[data.room] = [0, 0, 0, 0];
            playerNamesInRoom[data.room] = ["", "", "", ""];
            numUsersInRoom[data.room] = 1;
        } else {
            numUsersInRoom[data.room]++;
        }

        thisID = setID(data); //figure out which player to be
        socket.emit('userID', thisID); //socket.emit() sends a socket back to browser

        console.log("User " + thisID + ": " + data.player + " joined room " + data.room);
        console.log(usersInRoom[socket.myRoom]);
        console.log(numUsersInRoom[socket.myRoom]);

        socket.to(socket.myRoom).emit('playerNames', playerNamesInRoom[socket.myRoom]);
        socket.emit('playerNames', playerNamesInRoom[socket.myRoom]);

        socket.to(socket.myRoom).emit('numPlayers', numUsersInRoom[socket.myRoom]);
        socket.emit('numPlayers', numUsersInRoom[socket.myRoom]);

        if (numUsersInRoom[socket.myRoom] == 1 && data.public == true) {
            roomsInUse.push(data.room);
        }
        console.log(roomsInUse);
        socket.emit('roomsInUse', roomsInUse);
        socket.broadcast.emit('roomsInUse', roomsInUse);

    }

    
    function leaveRoom(data) {
        if (thisID != null) {
            socket.leave(socket.myRoom);
            console.log("User " + thisID + " left room " + socket.myRoom);
            usersInRoom[socket.myRoom][thisID] = 0;
            playerNamesInRoom[socket.myRoom][thisID] = "";
            numUsersInRoom[socket.myRoom]--;
            console.log(usersInRoom[socket.myRoom]);
            console.log(numUsersInRoom[socket.myRoom]);

            socket.to(socket.myRoom).emit('playerNames', playerNamesInRoom[socket.myRoom]);
            socket.emit('playerNames', playerNamesInRoom[socket.myRoom]);

            socket.to(socket.myRoom).emit('numPlayers', numUsersInRoom[socket.myRoom]);
            socket.emit('numPlayers', numUsersInRoom[socket.myRoom]);

            //if no one left in the room remove it from public room list
            if (numUsersInRoom[socket.myRoom] == 0) {
                for (var i = 0; i < roomsInUse.length; i++) {
                    if (socket.myRoom == roomsInUse[i]) {
                        roomsInUse.splice(i, 1);
                    }
                }
            }
        }

        console.log(roomsInUse);
        socket.emit('roomsInUse', roomsInUse);
        socket.broadcast.emit('roomsInUse', roomsInUse);


    }

    //Goes through if player 1, 2, 3, 4 is available and returns first available player slot
    function setID(data) {
        for (let i = 0; i < maxNumberOfPlayers + 1; i++) {
            if (i == maxNumberOfPlayers) {
                return i;
            }
            if (usersInRoom[data.room][i] == 0) {
                usersInRoom[data.room][i] = 1; //if specific user is not online, then assign this ID
                playerNamesInRoom[data.room][i] = data.player;
                console.log("User " + i + " connected.");
                return i;
            }
        }

    }

    function newData(data) {
        console.log(data);
        socket.to(socket.myRoom).emit('newData', data); //pass along data to other browsers in room
    }


}