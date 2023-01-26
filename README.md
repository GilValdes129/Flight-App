# Flight Search App

Flight Search App is a website that, when the user inputs their destination, origin place, dates, and shows flights options with currency exchange info.


## User Story

As a frequent traveler … 
I WANT to easily look for flights that match several criteria like: origin place, destination, departure date, and return date. 
I WANT to see the currency exchange of the destination place.


## Acceptance Criteria

WHEN the User opens the Flight Search App. 
THEN a landing page with a START BUTTON will be loaded.

WHEN the user clicks on the start button. 
THEN a second page will be shown with the following inputs: origin place, destination, departure date, and return date.

WHEN all inputs are in place and a SEARCH BUTTON is clicked. 
THEN the results will display the best option information, the cheapest option information, the fastest option information, and the direct option information. Also, the currency exchange information of the chosen destination will be displayed.


## APIs to be used
Currencies And Countries API, Skyscanner API, Openwheathermap API, and GeoDB Cities API


## Mock Up

![Captura de Pantalla 2023-01-12 a la(s) 20 55 27](https://user-images.githubusercontent.com/117420563/212226942-3ca722b6-3b94-4904-b875-1ac4109cf737.png)

![Captura de Pantalla 2023-01-12 a la(s) 20 54 54](https://user-images.githubusercontent.com/117420563/212226849-6096566f-eb6a-4eb9-9e95-e2a84b7b9366.png)

![Captura de Pantalla 2023-01-12 a la(s) 20 55 58](https://user-images.githubusercontent.com/117420563/212226752-0f29eae5-7eb0-4540-8ee4-6476e529ef7b.png)


## MVP

![Landing page](assets/readme-images/1-main.png)

![Search page in wide screens](assets/readme-images/2-search-lg.png)

![Search page in default mode, for small screens](assets/readme-images/3-search-sm.jpg)


The Flight App works in a way that the user starts in the landing page, where they can click on the Let's Go button.

The user will be directed into the Serch Page.

If the user doesn't write any input, a message will remind the user to fill out all the inputs.

Once the user fill out all the inputs, information of their flight will be displayed in three categories: best, cheapest, and fastest.

If there are no flights available for the chosen dates or destination, a message will display to let the user know about it.