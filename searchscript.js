var searchButton = document.getElementById("searchBtn");
var originEl = document.getElementById("origin");
var destinationEl = document.getElementById("destination");
var departureEl = document.getElementById("departure-date");
var returnEl = document.getElementById("return-date");

var warningMessage = document.getElementById("warningMessage");

var conversionRate = document.getElementById("conversion-rate");


//Funtion to add origin input to URL
var getFlights = function (originInput, destinationInput, departureInput, arrivalInput){
    var apiUrl = "https://skyscanner44.p.rapidapi.com/search?adults=1&origin=" + originInput + "&destination=" + destinationInput + "&departureDate=" + departureInput + "&returnDate=" + arrivalInput + "&currency=EUR";


const options = {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': 'f5253d08abmsh32cb1795e7b2900p1665f6jsnf91acf4926fb',
		'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
	}
};

fetch(apiUrl, options)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        

        var bestContainer = document.getElementById("bestResultContainer");
        var cheapContainer = document.getElementById("cheapestResultContainer");
        var fasttContainer = document.getElementById("fastesttResultContainer");

        //Best Flight Option Variables

        var bestPrice = data.itineraries.buckets[0].items[0].price.formatted
        var bestAirline = data.itineraries.buckets[0].items[0].legs[0].segments[0].marketingCarrier.name
        var bestOriginAirport = data.itineraries.buckets[0].items[0].legs[0].origin.name
        var bestOriginTime = data.itineraries.buckets[0].items[0].legs[0].departure
        var bestArrivalAirport = data.itineraries.buckets[0].items[0].legs[0].destination.name
        var bestArrivalTime = data.itineraries.buckets[0].items[0].legs[0].arrival
        var bestStopCount = data.itineraries.buckets[0].items[0].legs[0].stopCount
        var bestStopAirport = data.itineraries.buckets[0].items[0].legs[0].segments[0].destination.name
        var bestDurationTime = data.itineraries.buckets[0].items[0].legs[0].durationInMinutes
    
    
        var bestResults = document.createElement("p")
        bestResults.classList = "p-2 border-x border-b border-cyan-700 border-solid rounded-b-lg shadow-md"
        bestResults.textContent = "Price: " + bestPrice
        bestResults.textContent = "Airline: " + bestAirline
        bestResults.textContent = "Origin Airport: " + bestOriginAirport
        bestResults.textContent = "Departure Time: " + bestOriginTime
        bestResults.textContent = "Destination Airport: " + bestArrivalAirport
        bestResults.textContent = "Arrival Time: " + bestArrivalTime
        bestResults.textContent = "Stops: " + bestStopCount + " at " + bestStopAirport
        bestResults.textContent = "Flight Total Duration: " + bestDurationTime

        bestContainer.appendChild(bestResults)

        //Cheapest Flight Option Variables

        var cheapPrice = data.itineraries.buckets[1].items[0].price.formatted
        var cheapAirline = data.itineraries.buckets[1].items[0].legs[0].segments[0].marketingCarrier.name
        var cheapOriginAirport = data.itineraries.buckets[1].items[0].legs[0].origin.name
        var cheapOriginTime = data.itineraries.buckets[1].items[0].legs[0].departure
        var cheapArrivalAirport = data.itineraries.buckets[1].items[0].legs[0].destination.name
        var cheapArrivalTime = data.itineraries.buckets[1].items[0].legs[0].arrival
        var cheapStopCount = data.itineraries.buckets[1].items[0].legs[0].stopCount
        var cheapStopAirport = data.itineraries.buckets[1].items[0].legs[0].segments[0].destination.name
        var cheapDurationTime = data.itineraries.buckets[1].items[0].legs[0].durationInMinutes
    
    
        var cheapResults = document.createElement("p")
        cheapResults.classList = "p-2 border-x border-b border-cyan-700 border-solid rounded-b-lg shadow-md"
        cheapResults.textContent = "Price: " + cheapPrice
        cheapResults.textContent = "Airline: " + cheapAirline
        cheapResults.textContent = "Origin Airport: " + cheapOriginAirport
        cheapResults.textContent = "Departure Time: " + cheapOriginTime
        cheapResults.textContent = "Destination Airport: " + cheapArrivalAirport
        cheapResults.textContent = "Arrival Time: " + cheapArrivalTime
        cheapResults.textContent = "Stops: " + cheapStopCount + " at " + cheapStopAirport
        cheapResults.textContent = "Flight Total Duration: " + cheapDurationTime

        cheapContainer.appendChild(cheapResults)
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
            'X-RapidAPI-Key': '19c6a101cemsh067d5382299249cp1602a4jsn5c1586b20d97',
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
            'X-RapidAPI-Key': '6bc56a2ecbmsh4a17f4b38d52cc9p12909bjsn625ca3df7444',
            'X-RapidAPI-Host': 'currencies-and-countries.p.rapidapi.com'
        }
    };
    fetch('https://currencies-and-countries.p.rapidapi.com/convertWithSymbol?from=' + currency + '&to=MXN&amount=1', options)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        var mxnValue = data.result
        var mxnSymbol = data.symbol
        console.log(mxnValue)
        console.log(mxnSymbol)

        conversionRate.textContent= currency + "=" + mxnValue + mxnSymbol
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
            'X-RapidAPI-Key': 'f5253d08abmsh32cb1795e7b2900p1665f6jsnf91acf4926fb',
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