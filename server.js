require("dotenv").config();
require("./utils/database");

const fs    = require("fs");
const http  = require("http");

http.createServer((req, res) => {
    switch(req.method){
        case "GET":
            require('./router/get')(req,res);
            break;
        case "POST":
            require('./router/post')(req,res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end(JSON.stringify({ err : "Request method not implemented !", data : "Please use GET/POST method only !"}));
            break;
    }
}).listen(process.env.PORT, () => {
    console.log("===============================================")
    console.log(" __  __        _____                          ");
    console.log("|  \\/  |      / ____|                         ");
    console.log("| \\  / |_   _| (___   ___ _ ____   _____ _ __ ");
    console.log("| |\\/| | | | |\\___ \\ / _ \\ '__\\ \\ / / _ \\ '__|");
    console.log("| |  | | |_| |____) |  __/ |   \\ V /  __/ |   ");
    console.log("|_|  |_|\\__, |_____/ \\___|_|    \\_/ \\___|_|   ");
    console.log("         __/ |                                ");
    console.log("        |___/                                 ");
    console.log("===============================================");
    console.log("");
    console.log(`~~~ Server running on ${process.env.PORT} ~~~`);
});