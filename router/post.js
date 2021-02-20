const fs                        = require('fs');
const myFs                      = require('../utils/fileUtils');
const fetch                     = require('node-fetch')
const { innerText, rssContent } = require('../utils/utils');

module.exports = (req, res) => {
    switch (req.url) {
        case '/analize':

            //GET rss feed & parse it
            fetch(`${req.body.url}/.rss`, { method: 'GET' })
            .then(resp=>resp.text())
            .then(body=>{

                //Run tone analizer over the text 
                fetch(`${process.env.TONE_ANALIZER_URL}/v3/tone?version=2017-09-21`, { method: 'POST', headers: { Authorization: `Basic ${process.env.TONE_ANALIZER_KEY}` }, body: JSON.stringify({ text: innerText(rssContent(body)) }) })
                .then(resp=>resp.json())
                .then(async body=>{
                    var tones = {}
                    body.sentences_tone.map((sentence, index) => {sentence.tones.map(x=>{tones[x.tone_name] ? tones[x.tone_name] +=x.score : tones[x.tone_name] = x.score;})})
                    var chart = {type: "radar",data : {labels : Object.keys(tones),datasets : [{label : "texts", data : Object.values(tones)}]}}

                    fetch('https://quickchart.io/chart', {method:"POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({c : chart})})
                    .then(resp=>{
                        const file = `./download/${'_' + Math.random().toString(36).substr(2, 9)}.png`
                        const fileStream = fs.createWriteStream(file);
                        resp.body.pipe(fileStream);
                        fileStream.on("finish", async () => {
                            //read the image, delete it and encode it base64
                            const img = await myFs.readFile(file);
                                        await myFs.removeFile(file);

                            //convert image buffer to base64
                            body.chart = new Buffer.from(img).toString('base64');

                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.end(JSON.stringify(body));
                        });
                    })

                }).catch(e=>{console.error(e)});
            }).catch(e=>{console.error(e)});
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ err: "Not found !", data: "Route not implemented" }));
            break;
    }
}