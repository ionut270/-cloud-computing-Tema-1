const decodeBase64Image = (dataString) => {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};
  
    if (matches.length !== 3) return new Error('Invalid input string');
    
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    return response;
  }

const analize = () => {

    fetch("/analize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "url": "https://www.reddit.com/r/dogecoin/comments/lmjv22/dogecoin_daily_discussion_feb_18th" }),
    }).then(res => res.json())
    .then(res => {

        res.sentences_tone.map(sentence=>{
            document.getElementById('content').innerHTML+=`<div class='sentence'><label class='tone_label'>${JSON.stringify(sentence.tones)}</label>${sentence.text}</div>`
        })
    })
    .catch(e => {
        console.error(e)
    })
};

const start = () => { };
