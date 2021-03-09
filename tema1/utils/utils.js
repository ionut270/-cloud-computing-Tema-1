module.exports.innerText = (text)=>{
    var response = ''
    text.split(/&lt;/).map(a=>a.split(/&gt;/)[1] ? response += a.split(/&gt;/)[1] + ' ' : null)
    return response;
}
module.exports.rssContent = (text) =>{
    var response = ''
    text.split('</content>').map(a=>a.split('<content type="html">')[1] ? response += a.split('<content type="html">')[1] + ' ' : null)
    return response;
}

