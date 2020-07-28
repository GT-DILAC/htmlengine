# Making an Online Multiplayer Game with Websockets and Node.js
This package is a ready to use template to start building an online multiplayer game using Websockets and Node.js
* By Jordan Graves
* Updated: July 28, 2020

## Running the template files
* To run the game, you need to install Node.js: https://nodejs.org/en/download/
* In your terminal, navigate to the root directory and enter in the command "node server.js" This tells Node to run our server code, which is in our file node.js
* You will now be able to access the game in your web browser at the address "localhost:4000/"
* The command Ctrl-C will quit your server.

## Simulaneous Games with Rooms
This template allows you to run many multiplayer games simultaneously by allowing players to join rooms that are named with unique 4-letter codes (ex: IDJW). 
Players can:
* Create a new room
* Join a room if they already have a code
* See a list of public games and click button to join
The template is currently setup to allow up to 4 players in many rooms. If you'd like to make a game where everyone is playing together you can modify the template to have all players join the same room. The maximum number of players in a room can also be adjusted in the server code. 

## Node.js Server Code
The server is ready to run, but the steps that were taken to set it up include the commands "npm init" to initialize the project and create the package.json file. The server code uses the Express and Socket.io libraries, which were installed by the commands "npm install express --save" and "npm install socket.io --save"
* The first section of the server code initializes our variables and then sets up the websocket server and serves our "public" folder to our webpage. 
* Our newConnection() function holds all functions for our websocket functions
    * In this function we need to include the line "socket.on(' ', ___ );" for every Event Name we plan to receive, with the function we want to execute. For example, for "socket.on('myEvent', myFunction);" when our socket server receives a socket with the Event Name "myEvent" it will execute "myFunction" and pass through whatever data we sent to that socket.
    * In these functions that are executed, we can choose how we want to handle the data, and how we want to pass the data to the other browsers.
        * socket.emit( , ) sends a socket back to the browser that sent it
        * socket.broadcast.emit( , ) sends a socket to all browsers EXCEPT the original sender
        * socket.to(socket.myRoom).emit( , ) sends a socket to all other browsers that are in the same room
        * More info can be found here: https://socket.io/docs/emit-cheatsheet/

## Client-side Javascript
The index.html is ready to run and will join the websocket server. Here are the steps that were taken to make this work:
* Include the socket.io library in our HTML https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js
* Connect to the socket server with the line "socket = io.connect(port);"
    * Our port is (process.env.PORT || 4000). This allows us to connect at port 4000 which we also specifed in our node server code. This port can be changed, as long as both the server and client are on the same port. If you host your web app on a platform like Heroku, you won't be able to choose the port number, in that case it is accessed at process.env.PORT
* Establish what functions we want to execute when we receive websockets with certain Event Names. For example, for "socket.on('myEvent', myFunction);" when our browser receives a socket with the Event Name "myEvent" it will execute "myFunction" and pass through whatever data we sent with that socket.
* To send a socket to our server, use the line "socket.emit(' ', ___ );" For example, if we send socket.emit('newData', data) our socket server will execute the function we have told it to when it receives a socket with the Event Name "newData". "data" can be a Javascript Object that holds a lot of data about our player and their game choices. 

## Publishing
You can use a service like Heroku to host your web app online! Creating an account and new project provides you with step-by-step instructions to deploy your web app

## Credits
This was written skills learned from The Coding Train/Daniel Shiffman's "Creating a Collaborative Drawing Canvas" tutorial with p5.js and Node.js. Part 1 of 4 is here: https://www.youtube.com/watch?v=bjULmG8fqc8 1000% worth watching this entire series. It takes about an hour to complete the whole tutorial. 
