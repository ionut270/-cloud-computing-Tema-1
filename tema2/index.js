require("dotenv").config();
require("./utils/database");

const http  = require("http");
const utils = require("./utils/utils");

http.createServer((req, res) => {
    // ~~~ metrics ~~~
    if (require('./utils/database').client() !== undefined) { // if we are connected to the db proceed with the metrics...
        const metrics       = require("./utils/metrics");
        const startPoint    = Date.now();
        res.on("finish", () => req.url !== "/metrics" ? metrics.add({ path: req.url, method: req.method, status: res.statusCode, dateTime: startPoint, duration: Date.now() - startPoint }) : 0);
    }
    // ~~~ metrics ~~~

    let body = [];
    switch (req.method) {
        case "GET":
            req = utils.queryParse(req);
            require('./router/get')(req, res);
            break;
        case "POST":
            body = [];
            req.on('data', (chunk) => { body.push(chunk) }).on('end', () => {
                req.body = Buffer.concat(body).toString();
                req.body ? req.body = JSON.parse(req.body) : null;
                require('./router/post')(req, res);
            });
            break;
        case "PUT":
            body = [];
            req.on('data', (chunk) => { body.push(chunk) }).on('end', () => {
                req.body = Buffer.concat(body).toString();
                req.body ? req.body = JSON.parse(req.body) : null;
                require('./router/put')(req, res);
            });
            break;
        case "DELETE":
            body = [];
            req.on('data', (chunk) => { body.push(chunk) }).on('end', () => {
                req.body = Buffer.concat(body).toString();
                req.body ? req.body = JSON.parse(req.body) : null;
                require('./router/delete')(req, res);
            });
            break;
        default:
            utils.sendErr(res,405,{ err: "Request method not implemented !", data: "Please use GET/POST/PUT/DELETE method only !" })
            break;
    }
}).listen(process.env.PORT, () => {
    console.log("====================================================================");
    console.log(' _______  ___   _______  _______        __   __  ______    ___     ');
    console.log('|       ||   | |       ||       |      |  | |  ||    _ |  |   |    ');
    console.log('|    _  ||   | |       ||   _   |      |  | |  ||   | ||  |   |    ');
    console.log('|   |_| ||   | |       ||  | |  |      |  |_|  ||   |_||_ |   |    ');
    console.log('|    ___||   | |      _||  |_|  | ___  |       ||    __  ||   |___ ');
    console.log('|   |    |   | |     |_ |       ||   | |       ||   |  | ||       |');
    console.log('|___|    |___| |_______||_______||___| |_______||___|  |_||_______|');
    console.log("===================================================================");
    console.log("");
    console.log(`~~~ Server running on ${process.env.PORT} ~~~`);
});