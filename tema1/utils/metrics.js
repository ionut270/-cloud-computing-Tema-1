const mongo = require('./database').client();
const db    = mongo.db('tema_1').collection('metrics');

function getMetrics(){
    return new Promise((resolve,reject)=>{
        db.find().toArray((err,docs)=>{
            if(err) console.error(err);
            resolve(docs);
        })
    })
}

function addMetrics(obj){
    return new Promise((resolve,reject)=>{
        db.insertOne(obj,(err)=>{
            if(err) console.error(err);
            resolve();
        })
    })
}

module.exports = {
    get : getMetrics,
    add : addMetrics
}