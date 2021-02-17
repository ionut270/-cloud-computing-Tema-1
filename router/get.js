const fs = require('fs');


module.exports = (req,res)=>{
    //process query
    var url     = req.url.split(/\?/)[0];
    var query   = req.url.split(/\?/)[1];

    if(query){ // process the query
        var processed = {};
        query.split(/&/).map(p=> processed[p.split(/=/)[0]] = p.split(/=/)[1] )
        query = processed
    }


    switch(url){
        case 'file':
            if(query & query.path){
                res.statusCode = 200;
                fs.createReadStream(`./client/assets/${query.path}`).pipe(res);
            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain");
                res.end(JSON.stringify({ err : "Not path provided", data : "Invalid path"}));
            }
            break;

        case '/':
            break;
            
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end(JSON.stringify({ err : "Not found !", data : "Route not implemented"}));
            break;
    }
}