require("dotenv").config();
require("./utils/database");
const http      = require("http");
const metrics   = require("./utils/metrics");

http.createServer((req, res) => {
    
    // ~~~ metrics ~~~
    const startPoint = Date.now();
    res.on("finish", () => req.url !== "/metrics" ? metrics.add({path: req.url, method: req.method, status: res.statusCode, dateTime: startPoint, duration: Date.now() - startPoint }) : 0 );
    // ~~~ metrics ~~~

    switch(req.method){
        case "GET":
            //~~~ query parse ~~~
            if(req.url.split(/\\?/)[1]){ // process the query
                var processed = {};
                req.url.split(/\\?/)[1].split(/&/).map(p=> processed[p.split(/=/)[0]] = p.split(/=/)[1] )
                req.query = processed
            }
            req.url = req.url.split(/\\?/)[0];
            //~~~ query parse ~~~
            require('./router/get')(req,res);
            break;
        case "POST":
            //~~~ body-parse ~~~
            let body = [];
            req.on('data', (chunk) => {body.push(chunk);}).on('end', () => {
                req.body = Buffer.concat(body).toString();
                req.body = JSON.parse(req.body);
                require('./router/post')(req,res);
            });
            //~~~ body-parse ~~~
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ err : "Request method not implemented !", data : "Please use GET/POST method only !"}));
            break;
    }

}).listen(process.env.PORT, () => {
    console.log("=======================================================================");
    console.log(" _____ _                        _                     _ _              ")
    console.log("|_   _| |                      | |                   | (_)             ")
    console.log("  | | | |__  _ __ ___  __ _  __| |   __ _ _ __   __ _| |_ _______ _ __ ")
    console.log("  | | | '_ \\| '__/ _ \\/ _` |/ _` |  / _` | '_ \\ / _` | | |_  / _ \\ '__|")
    console.log("  | | | | | | | |  __/ (_| | (_| | | (_| | | | | (_| | | |/ /  __/ |   ")
    console.log("  \\_/ |_| |_|_|  \\___|\\__,_|\\__,_|  \\__,_|_| |_|\\__,_|_|_/___\\___|_|                ")                                                         
    console.log("=======================================================================");
    console.log("");
    console.log(`~~~ Server running on ${process.env.PORT} ~~~`);
});