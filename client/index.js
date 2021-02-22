const analize = () => {
    //reset html
    document.getElementById('content').innerHTML = '';

    //loader on
    document.getElementById('loader').style.display='block';

    fetch("/analize", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "url": document.getElementById('app_input').value }) })
    .then(res => res.json())
    .then(res => { 
        //loader off
        document.getElementById('loader').style.display='none';

        document.getElementById('content').innerHTML+= `<img src="data:image/png;base64,${res.chart}" alt="chart" />`
        res.sentences_tone.map(sentence=>{ sentence.tones.length > 0 ? document.getElementById('content').innerHTML+=`<div class='sentence'>${sentence.text}<label class='tone_label'>${JSON.stringify(sentence.tones)}</label></div>` : null })
    })
    .catch(e => {
        console.error(e)
    })
};

const start = () => { };
