const fs = require('fs');

module.exports = (req,res)=>{
    switch(req.url){
        case '/file':
            if(req.query && req.query.path){
                res.statusCode = 200;
                fs.createReadStream(`./client/${decodeURIComponent(req.query.path)}`).pipe(res);
            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ err : "No path provided", data : "Invalid path"}));
            }
            break;
        case '/':
            res.statusCode = 200;
            fs.createReadStream(`./client/index.html`, 'utf8').pipe(res);
            break;

        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ err : "Not found !", data : "Route not implemented"}));
            break;
    }
}