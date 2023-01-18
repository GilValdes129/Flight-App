var searchButton = document.getElementById("searchBtn");
var resultsList = document.getElementById("resultsList");

var originEl = document.getElementById("origin");
var destinationEl = document.getElementById("destination");
var departureEl = document.getElementById("departure-date");
var returnEl = document.getElementById("return-date");

var warningMessage = document.getElementById("warningMessage");


//Funtion to add origin input to URL
var getFlights = function (originInput, destinationInput, departureInput, arrivalInput){
    var apiUrl = "https://skyscanner44.p.rapidapi.com/search?adults=1&origin=" + originInput + "&destination=" + destinationInput + "departureDate=" + departureInput + "&returnDate=" + arrivalInput + "&currency=EUR";
console.log(apiUrl)

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0e64ed8ee1mshed53c702e8ef267p1b57ffjsnc18f0a9c4ac3',
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
    }
};

fetch(apiUrl, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

console.log(response)

}


var obtainResults = function (event){
    event.preventDefault();

    var originInput = originEl.value.trim();
    localStorage.setItem("origin", originInput)
    var destinationInput = destinationEl.value.trim();
    localStorage.setItem("destiny", destinationInput)
    var departureInput = departureEl.value;
    var arrivalInput = returnEl.value;

    console.log(originInput)
    console.log(destinationInput)
    console.log(departureInput)
    console.log(arrivalInput)


    if(originInput && destinationInput && departureInput && arrivalInput) {
        getFlights(originInput, destinationInput, departureInput, arrivalInput);
        
        resultsList.textContent = "";
    
        originInput.value = "";
        destinationInput.value = "";
        departureInput.value = "";
        arrivalInput.value = "";
    } else {
        warningMessage.classList.remove("hidden");
    }
    getIATA()
};


//getIATA function to change destination & origin input into IATA 
function getIATA(){
    const origin = localStorage.getItem("origin")
    const destiny = localStorage.getItem("destiny")
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0e64ed8ee1mshed53c702e8ef267p1b57ffjsnc18f0a9c4ac3',
            'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
        }
    };
    
    /*fetch(`https://skyscanner44.p.rapidapi.com/autocomplete?query=${origin}`, options)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            console.log(data[0].iata_code)
            var iataOrigin = data[0].iata_code;
            localStorage.setItem("IataOrigin", iataOrigin)
        })
        .catch(err => console.error(err));*/
        
    fetch(`https://skyscanner44.p.rapidapi.com/autocomplete?query=${destiny}`, options)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            console.log(data[0].iata_code)
            var iataOrigin = data[0].iata_code;
            localStorage.setItem("IataOrigin", iataOrigin)
        })
        .catch(err => console.error(err));

}



searchButton.addEventListener("click", obtainResults)
