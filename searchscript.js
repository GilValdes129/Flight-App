var searchButton = document.getElementById("searchBtn");
var resultsList = document.getElementById("resultsList");

var originEl = document.getElementById("origin");
var destinationEl = document.getElementById("destination");
var departureEl = document.getElementById("departure-date");
var returnEl = document.getElementById("return-date");

var warningMessage = document.getElementById("warningMessage");
var flightOptions = [{
    best: {
        destination:
        arrival:
        
        price:

    }
}]

//Funtion to add origin input to URL
var getFlights = function (originInput, destinationInput, departureInput, arrivalInput){
    var apiUrl = "https://skyscanner44.p.rapidapi.com/search?adults=1&origin=" + originInput + "&destination=" + destinationInput + "&departureDate=" + departureInput + "&returnDate=" + arrivalInput + "&currency=EUR";


const options = {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': 'b3b89a7969mshd108a04b837f3e6p15cb70jsn3915c1614c4c',
		'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
	}
};

fetch(apiUrl, options)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        console.log(data.itineraries.buckets[0].items[0].price.formatted) //price path
        console.log(data.itineraries.buckets[0].items[0].legs[0].segments[0].marketingCarrier.name) //airline path    
        console.log(data.itineraries.buckets[0].items[0].legs[0].segments[0].destination.name) //destination path
        console.log(data.itineraries.buckets[0].items[0].legs[0].departure) //Departure path
        console.log(data.itineraries.buckets[0].items[0].legs[0].durationInMinutes) // Duration path
        console.log(data.itineraries.buckets[0].items[0].legs[0].arrival) //Arrival Path
        console.log(data.itineraries.buckets[0].items[0].legs[0].stopCount) //Escalas Path
        console.log(data.itineraries.buckets[0].items[0].legs[0].segments[0].destination.name) //Escala Destination
    })
    .catch(err => console.error(err));
}


var obtainResults = function (event){
    event.preventDefault();

    var originInput = originEl.value.trim();
    localStorage.setItem("origin", originInput)
    var destinationInput = destinationEl.value.trim();
    localStorage.setItem("destiny", destinationInput)
    var departureInput = departureEl.value;
    localStorage.setItem("Departure", dayjs(departureInput).format("YYYY-MM-DD"))
    var arrivalInput = returnEl.value;
    localStorage.setItem("arrival", dayjs(arrivalInput).format("YYYY-MM-DD"))

    console.log(originInput)
    console.log(destinationInput)
    console.log(departureInput)
    console.log(arrivalInput)


    if(originInput && destinationInput && departureInput && arrivalInput) {
        //getFlights(originInput, destinationInput, departureInput, arrivalInput);
        
       // resultsList.textContent = "";
    
        originInput.value = "";
        destinationInput.value = "";
        departureInput.value = "";
        arrivalInput.value = "";
    } else {
        warningMessage.classList.remove("hidden");
    }
    getIATA()
    getCoordinates(destinationInput)
};

//Function to get the longitude and latitude from the city, also can be upgradable to get the weather.
function getCoordinates(city){
   var getinfo = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=33914f843cb7f4d9a146b4cb8ba2a07b`
   fetch(getinfo)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            console.log(data.coord)
            var lat = data.coord.lat
            var lon = data.coord.lon
            var sumSign = "%2B"
            if(lon < 0){
                sumSign = ""
            }
            var coordinates = `${lat}${sumSign}${lon}`
            console.log(coordinates)
            getCityInfo(coordinates)
        })
}

function getCityInfo(coordinates){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6bc56a2ecbmsh4a17f4b38d52cc9p12909bjsn625ca3df7444',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };
    
    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?location=${coordinates}`, options)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            var isoCode = data.data[0].countryCode
            console.log(isoCode)

            getCurrency(isoCode);
            })
        .catch(err => console.error(err));
}

function getCurrency (isoCode){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4ff2d536b3mshf520961f015e819p16389fjsn7b0df2ef4acf',
            'X-RapidAPI-Host': 'currencies-and-countries.p.rapidapi.com'
        }
    };

    fetch('https://currencies-and-countries.p.rapidapi.com/getCountryInfo?param=ISO&value='+ isoCode, options)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        var currency = data.currency
        console.log(currency)

        currencyConvertion(currency);
    })
    .catch(err => console.error(err));
    
};

function currencyConvertion(currency) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4ff2d536b3mshf520961f015e819p16389fjsn7b0df2ef4acf',
            'X-RapidAPI-Host': 'currencies-and-countries.p.rapidapi.com'
        }
    };
    fetch('https://currencies-and-countries.p.rapidapi.com/convertWithSymbol?from=' + currency + '&to=MXN&amount=1', options)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })
    .catch(err => console.error(err));
}


//getIATA function to change destination & origin input into IATA 
function getIATA(){
    const origin = localStorage.getItem("origin")
    const destiny = localStorage.getItem("destiny")
    const arrival = localStorage.getItem("arrival")
    const departure = localStorage.getItem("Departure")
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '25b137be54mshdb1f4ed297e9561p1d515fjsnf670af0dee0e',
            'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
        }
    };
    
    fetch(`https://skyscanner44.p.rapidapi.com/autocomplete?query=${origin}`, options)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            
            var iataOrigin = data[1].iata_code;
            localStorage.setItem("IataOrigin", iataOrigin)
        })
        .catch(err => console.error(err));
        
    fetch(`https://skyscanner44.p.rapidapi.com/autocomplete?query=${destiny}`, options)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            
            var iataDestiny = data[1].iata_code;
            localStorage.setItem("IataDestiny", iataDestiny)
        })
        .catch(err => console.error(err));
    const IATAdestiny = localStorage.getItem("IataDestiny")
    const IATAorigin = localStorage.getItem("IataOrigin")
    getFlights(IATAorigin, IATAdestiny, departure, arrival)
}



searchButton.addEventListener("click", obtainResults)