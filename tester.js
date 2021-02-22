require('dotenv').config()
const async = require('async');
const fetch = require('node-fetch');
const requests = 500;

async.eachLimit(
    Array.from(Array(requests).keys()), // an array containing 500 numbers from 1 to 500
    50, //instances count  
    (index, callback) => {
        console.log(`Running request ${index} out og ${requests}`);
        fetch(`${process.env.APP_HOST}/analize`,{
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({url : "https://www.reddit.com/r/DotA2/comments/lopiks/dpc_season_1_feb_21_match_discussions"})
        }).then(res=>res.json())
        .then(res=>{
            callback();
        })
        .catch(err=>{
            console.error(err)
            callback();
        })
    },(err) => {
        if (err) { console.log("err : ", err); throw err; }
        else console.log("Function ran sucesfully.");
});