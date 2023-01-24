var searchButton = document.getElementById("searchBtn");
var originEl = document.getElementById("origin");
var destinationEl = document.getElementById("destination");
var departureEl = document.getElementById("departure-date");
var returnEl = document.getElementById("return-date");

var warningMessage = document.getElementById("warningMessage");

var conversionRate = document.getElementById("conversion-rate");

var resultsContainer = document.getElementById("results-container");


//Funtion to add origin input to URL
var getFlights = function (originInput, destinationInput, departureInput, arrivalInput){
    var apiUrl = "https://skyscanner44.p.rapidapi.com/search?adults=1&origin=" + originInput + "&destination=" + destinationInput + "&departureDate=" + departureInput + "&returnDate=" + arrivalInput + "&currency=MXN";


const options = {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': '435a89b1dbmsh1fe6477136c0919p1bee02jsn0ab115c88c8f',
		'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
	}
};

fetch(apiUrl, options)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)


        if (data.context.totalResults === 0){
            
            var noFlightsMessage = document.getElementById("noFlightsMessage");

            resultsContainer.classList.remove("hidden");
            noFlightsMessage.classList.add("hidden");

            return
            } else {
                noFlightsMessage.classList.remove("hidden");
                }
                    
        

        var bestContainer = document.getElementById("bestResultContainer");
        var cheapContainer = document.getElementById("cheapestResultContainer");
        var fastContainer = document.getElementById("fastestResultContainer");



        //Best Flight Option Variables

        var bestPrice = document.getElementById("bestPrice");
        var bestPriceInfo = data.itineraries.buckets[0].items[0].price.formatted
        bestPrice.textContent = "Price: " + bestPriceInfo
        var bestAirline = document.getElementById("bestAirline");
        var bestAirlineInfo = data.itineraries.buckets[0].items[0].legs[0].segments[0].marketingCarrier.name
        bestAirline.textContent = "Airline: " + bestAirlineInfo
    
        var bestOriginAirport = document.getElementById("bestOriginAirport");
        var bestOriginAirportInfo = data.itineraries.buckets[0].items[0].legs[0].origin.name
        bestOriginAirport.textContent = "Origin Airport: " + bestOriginAirportInfo
    
        var bestOriginTime = document.getElementById("bestOriginTime");
        var bestOriginTimeInfo = data.itineraries.buckets[0].items[0].legs[0].departure
        bestOriginTime.textContent = "Departure Time: " + bestOriginTimeInfo

        var bestArrivalAirport = document.getElementById("bestArrivalAirport");
        var bestArrivalAirportInfo = data.itineraries.buckets[0].items[0].legs[0].destination.name
        bestArrivalAirport.textContent = "Destination Airport: " + bestArrivalAirportInfo
       
        var bestArrivalTime = document.getElementById("bestArrivalTime");
        var bestArrivalTimeInfo = data.itineraries.buckets[0].items[0].legs[0].arrival
        bestArrivalTime.textContent = "Arrival Time: " + bestArrivalTimeInfo

        var bestStopCount = document.getElementById("bestStopCount");
        var bestStopCountInfo = data.itineraries.buckets[0].items[0].legs[0].stopCount
        var bestStopAirportInfo = data.itineraries.buckets[0].items[0].legs[0].segments[0].destination.name
        bestStopCount.textContent = "Stops: " + bestStopCountInfo + " at " + bestStopAirportInfo
        
        var bestDurationTime = document.getElementById("bestDurationTime");
        var bestDurationTimeInfo = data.itineraries.buckets[0].items[0].legs[0].durationInMinutes
        bestDurationTime.textContent = "Flight Total Duration: " + bestDurationTimeInfo


        //Cheapest Flight Option Variables.
        var cheapPrice = document.getElementById("cheapPrice");
        var cheapPriceInfo = data.itineraries.buckets[1].items[0].price.formatted
        cheapPrice.textContent = "Price: " + cheapPriceInfo

        var cheapAirline = document.getElementById("cheapAirline");
        var cheapAirlineInfo = data.itineraries.buckets[1].items[0].legs[0].segments[0].marketingCarrier.name
        cheapAirline.textContent = "Airline: " + cheapAirlineInfo
    
        var cheapOriginAirport = document.getElementById("cheapOriginAirport");
        var cheapOriginAirportInfo = data.itineraries.buckets[1].items[0].legs[0].origin.name
        cheapOriginAirport.textContent = "Origin Airport: " + cheapOriginAirportInfo
    
        var cheapOriginTime = document.getElementById("cheapOriginTime");
        var cheapOriginTimeInfo = data.itineraries.buckets[1].items[0].legs[0].departure
        cheapOriginTime.textContent = "Departure Time: " + cheapOriginTimeInfo

        var cheapArrivalAirport = document.getElementById("cheapArrivalAirport");
        var cheapArrivalAirportInfo = data.itineraries.buckets[1].items[0].legs[0].destination.name
        cheapArrivalAirport.textContent = "Destination Airport: " + cheapArrivalAirportInfo
       
        var cheapArrivalTime = document.getElementById("cheapArrivalTime");
        var cheapArrivalTimeInfo = data.itineraries.buckets[1].items[0].legs[0].arrival
        cheapArrivalTime.textContent = "Arrival Time: " + cheapArrivalTimeInfo

        var cheapStopCount = document.getElementById("cheapStopCount");
        var cheapStopCountInfo = data.itineraries.buckets[1].items[0].legs[0].stopCount
        var cheapStopAirportInfo = data.itineraries.buckets[1].items[0].legs[0].segments[0].destination.name
        cheapStopCount.textContent = "Stops: " + cheapStopCountInfo + " at " + cheapStopAirportInfo
        
        var cheapDurationTime = document.getElementById("cheapDurationTime");
        var cheapDurationTimeInfo = data.itineraries.buckets[1].items[0].legs[0].durationInMinutes
        cheapDurationTime.textContent = "Flight Total Duration: " + cheapDurationTimeInfo

        //Fastes Flight Option Variables
        var fastPrice = document.getElementById("fastPrice");
        var fastPriceInfo = data.itineraries.buckets[2].items[0].price.formatted
        fastPrice.textContent = "Price: " + fastPriceInfo

        var fastAirline = document.getElementById("fastAirline");
        var fastAirlineInfo = data.itineraries.buckets[2].items[0].legs[0].segments[0].marketingCarrier.name
        fastAirline.textContent = "Airline: " + fastAirlineInfo

        var fastOriginAirport = document.getElementById("fastOriginAirport");
        var fastOriginAirportInfo = data.itineraries.buckets[2].items[0].legs[0].origin.name
        fastOriginAirport.textContent = "Origin Airport: " + fastOriginAirportInfo

        var fastOriginTime = document.getElementById("fastOriginTime");
        var fastOriginTimeInfo = data.itineraries.buckets[2].items[0].legs[0].departure
        fastOriginTime.textContent = "Departure Time: " + fastOriginTimeInfo

        var fastArrivalAirport = document.getElementById("fastArrivalAirport");
        var fastArrivalAirportInfo = data.itineraries.buckets[2].items[0].legs[0].destination.name
        fastArrivalAirport.textContent = "Destination Airport: " + fastArrivalAirportInfo
       
        var fastArrivalTime = document.getElementById("fastArrivalTime");
        var fastArrivalTimeInfo = data.itineraries.buckets[2].items[0].legs[0].arrival
        fastArrivalTime.textContent = "Arrival Time: " + fastArrivalTimeInfo

        var fastStopCount = document.getElementById("fastStopCount");
        var fastStopCountInfo = data.itineraries.buckets[2].items[0].legs[0].stopCount
        var fastStopAirportInfo = data.itineraries.buckets[2].items[0].legs[0].segments[0].destination.name
        fastStopCount.textContent = "Stops: " + fastStopCountInfo + " at " + fastStopAirportInfo
        
        var fastDurationTime = document.getElementById("fastDurationTime");
        var fastDurationTimeInfo = data.itineraries.buckets[2].items[0].legs[0].durationInMinutes
        fastDurationTime.textContent = "Flight Total Duration: " + fastDurationTimeInfo

        //Direct Flight Option Variables
        var directPrice = document.getElementById("directPrice");
        var directPriceInfo = data.itineraries.buckets[3].items[0].price.formatted
        directPrice.textContent = "Price: " + directPriceInfo

        var directAirline = document.getElementById("directAirline");
        var directAirlineInfo = data.itineraries.buckets[3].items[0].legs[0].segments[0].marketingCarrier.name
        directAirline.textContent = "Airline: " + directAirlineInfo

        var directOriginAirport = document.getElementById("directOriginAirport");
        var directOriginAirportInfo = data.itineraries.buckets[3].items[0].legs[0].origin.name
        directOriginAirport.textContent = "Origin Airport: " + directOriginAirportInfo

        var directOriginTime = document.getElementById("directOriginTime");
        var directOriginTimeInfo = data.itineraries.buckets[3].items[0].legs[0].departure
        directOriginTime.textContent = "Departure Time: " + directOriginTimeInfo

        var directArrivalAirport = document.getElementById("directArrivalAirport");
        var directArrivalAirportInfo = data.itineraries.buckets[3].items[0].legs[0].destination.name
        directArrivalAirport.textContent = "Destination Airport: " + directArrivalAirportInfo
       
        var directArrivalTime = document.getElementById("directArrivalTime");
        var directArrivalTimeInfo = data.itineraries.buckets[3].items[0].legs[0].arrival
        directArrivalTime.textContent = "Arrival Time: " + directArrivalTimeInfo

        var directStopCount = document.getElementById("directStopCount");
        var directStopCountInfo = data.itineraries.buckets[3].items[0].legs[0].stopCount
        var directStopAirportInfo = data.itineraries.buckets[3].items[0].legs[0].segments[0].destination.name
        directStopCount.textContent = "Stops: " + directStopCountInfo + " at " + directStopAirportInfo
        
        var directDurationTime = document.getElementById("directDurationTime");
        var directDurationTimeInfo = data.itineraries.buckets[3].items[0].legs[0].durationInMinutes
        directDurationTime.textContent = "Flight Total Duration: " + directDurationTimeInfo


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

        //Removes the hidden class of the results container so the results show
        resultsContainer.classList.remove("hidden");
        warningMessage.classList.add("hidden");

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
            'X-RapidAPI-Key': '435a89b1dbmsh1fe6477136c0919p1bee02jsn0ab115c88c8f',
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