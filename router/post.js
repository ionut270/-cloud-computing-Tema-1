module.exports = (req,res)=>{
    switch(req.url){
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end(JSON.stringify({ err : "Not found !", data : "Route not implemented"}));
            break;
    }
}