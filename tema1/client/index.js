function submitURL(){
    fetch('/new',{
        method:'POST',
        headers : {"Content-Type" : "application/json"},
        body:JSON.stringify({ "url":document.getElementById('url_input').value })
    }).then(res=>res.json())
    .then(res=>{
        document.getElementById('response').innerHTML = JSON.stringify(res)
    })
}