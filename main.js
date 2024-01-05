
let interval;
let rate = 10000;

// document.getElementById("rateNumber").textContent = `${rate}ms`;

const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-api-key': 'e9c83b5b75f44e04b97bc13c0db3a18a' }
};

function runApi() {
    document.getElementById("value").textContent = "Loading..."
    fetch('https://api.opensea.io/api/v2/listings/collection/mavia-land/best?limit=1', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            document.getElementById("value").textContent = parseFloat(response.listings[0].price.current.value / 1e18).toFixed(3) + " ETH";
            calculate(response.listings[0].price.current.value / 1e18);
            holdings(response.listings[0].price.current.value / 1e18);
        })
        .catch(err => console.error(err));
}

function getImage() {
    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-api-key': 'e9c83b5b75f44e04b97bc13c0db3a18a'}
      };
      
      fetch('https://api.opensea.io/api/v2/chain/ethereum/account/0xb93FF2883C27734FdDE671828E6db55541D75fe2/nfts?collection=mavia-land&limit=1', options)
        .then(response => response.json())
        .then(response => {
            console.log(response.nfts[0].image_url)
            document.getElementById("image").innerHTML = `<a target="_blank" href="${response.nfts[0].opensea_url}" class="link"><img src="${response.nfts[0].image_url}"></a>`
            
        })
        .catch(err => console.error(err));

}

function holdings(value){
    document.getElementById("atla").innerHTML = parseFloat((value * 87) / 100).toFixed(3) + " ETH";
    document.getElementById("pai").innerHTML =  parseFloat((value * 13) / 100).toFixed(3) + " ETH";
}

function startApi(_rate) {
    runApi()
    interval = setInterval(runApi, _rate);
}

// function stopInterval() {
//     clearInterval(interval);
// }

// function changeRate(_rate) {
//     rate = _rate;
//     document.getElementById("rateNumber").textContent = `${rate}ms`;
//     clearInterval(interval);
//     startApi(rate);
// }

// document.getElementById("changeRate").addEventListener("click", function (e) {
//     document.getElementById("rateBuffer").style.display = "block";
// })

// document.getElementById("applyRate").addEventListener("click", function (e) {
//     if (document.getElementById("rate").value == "") return;
//     changeRate(document.getElementById("rate").value);
//     document.getElementById("rateBuffer").style.display = "none";
// })

// document.getElementById("stopInterval").addEventListener("click", function (e) {
//     stopInterval();
// })

startApi(rate);
getImage()

function calculate(value){
    let bought_price = document.getElementById("bought_price").textContent.split(" ")[0] * 1;
    document.getElementById("position").textContent = parseFloat(value - bought_price).toFixed(3) + " ETH";
}
