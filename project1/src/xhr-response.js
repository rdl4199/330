function loadJsonXHR(symbol,type, interval = "15min"){
    let url;
    if(type == "INTRADAY")
    {
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_${type}&symbol=${symbol}&interval=${interval}&outputsize=full&apikey=28VOP1X5XT3XR809`;
    }
    else if(type == "DAILY")
    {
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_${type}&symbol=${symbol}&outputsize=full&apikey=28VOP1X5XT3XR809`;
    }

    // https://dog.ceo/api/breed/hound/images
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        let json;
        try{
            json = JSON.parse(e.target.responseText);
            console.log("Data Recieved")
            return json;
        }catch{
            document.querySelector("#output").innerHTML = "<p>BAD JSON!</p>";
            return;
        }
    }
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET",url);
    xhr.send();
}
export {loadJsonXHR};