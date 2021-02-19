const fs                        = require('fs');
const request                   = require('request');
const { innerText, rssContent } = require('../utils/utils');

module.exports = (req, res) => {
    switch (req.url) {
        case '/analize':
            //GET rss feed & parse it
            request(`${req.body.url}/.rss`, { method: 'GET' }, (err, data, body) => {
                if (err) console.error('[rss]', err)

                //analize tone of rss feed
                request(`${process.env.TONE_ANALIZER_URL}/v3/tone?version=2017-09-21`, { method: 'POST', headers: { Authorization: `Basic ${process.env.TONE_ANALIZER_KEY}` }, body: JSON.stringify({ text: innerText(rssContent(body)) }) }, (err, data, body) => {
                    if (err) console.error('[analize text]', err)

                    //parse data, in the apropiate form for a chart
                    var tones = {}
                    JSON.parse(body).sentences_tone.map((sentence, index) => {sentence.tones.map(x=>{tones[x.tone_name] ? tones[x.tone_name] +=x.score : tones[x.tone_name] = x.score;})})
                    var chart = {type: "radar",data : {labels : Object.keys(tones),datasets : [{label : "texts", data : Object.values(tones)}]}}

                    request("https://quickchart.io/chart", {method:"POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({c : chart})},(err, data, image) => {
                        if (err) console.error('[chart make]', err)

                        fs.writeFile('./chart.png',new Buffer(image),(err)=>{
                            if(err) console.error(err);
                        });

                        body        = JSON.parse(body);
                        body.chart  = new Buffer(image).toString('base64')

                        res.setHeader("Content-Type", "application/json");
                        res.statusCode = 200;
                        res.end(JSON.stringify(body));
                    })
                })
            })
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ err: "Not found !", data: "Route not implemented" }));
            break;
    }
}