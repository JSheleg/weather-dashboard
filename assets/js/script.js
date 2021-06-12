var citySearch = document.querySelector("#submit");
var cityInput = document.querySelector("#floatingTextarea")
var currentTemp = document.querySelector("#current-temp");
var currentWindSpeed = document.querySelector("#current-wind-speed");
var currentHumidity = document.querySelector("#current-humidity");
var currentUvIndex = document.querySelector("#current-uv-index");
var citySpan = document.getElementById('city');
var dateSpan = document.getElementById('date');
var date = moment(date).format('M/D/YYYY');
var day1Date=document.querySelector("#date1");
var day1TempSpan= document.getElementById('day1Temp');
var day1WindSpan= document.querySelector('#day1Wind');
var day1HumiditySpan=document.querySelector('#day1Hum');




var longitude =-96.808891;
var latitude=32.779167;
var lat;
var long;
var responseObject;
const url="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long +"&appid=732c347ea0e41d029999d7150a2a657d&units=imperial"
var currentCityUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + lat + "&longitude="+long+"&localityLanguage=en"

var getCurrentLocation = function(){
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lat + "current lat")
        console.log(long + "current long");

        fetch(currentCityUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            console.log(response);

            var currentCity =response.city;
            citySpan.innerText = currentCity;
            

            lat = response.latitude
            long = longitude;
            console.log( lat + "lat")
            console.log( long + "long")
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long +"&appid=732c347ea0e41d029999d7150a2a657d&units=imperial")
            .then(function(response){
                return response.json()
            })
            .then(function(response){
                console.log(response)
                // local temp
                var temp = response.current.temp;
                currentTemp.append(temp +" F");
                // local wind speed
                var wind = response.current.wind_speed;
                currentWindSpeed.append(wind + " MPH");
                //local humidity    
                var humidity = response.current.humidity;
                currentHumidity.append( humidity + " %");
                //local uv index
                var uvindex = response.current.uvi
                currentUvIndex.append(uvindex);
                //populate date
                dateSpan.innerText = date;

                responseObject = response;
                console.log(responseObject)
                fiveDayforecast(responseObject);
                
                
            })
        })
    })
}

 var fiveDayforecast =function(){
    
    
    //set day 1 and populate card
    var day1 = moment(date).add(1, 'days');
    day1 =day1.format('l')
    day1Date.innerText = day1;
    console.log(responseObject.daily[0].weather[0].icon)
    var img = document.createElement("img");
    console.log(`http://openweathermap.org/img/w/${responseObject.daily[0].weather[0].icon}.png`)
    img.setAttribute("src",`http://openweathermap.org/img/w/${responseObject.daily[0].weather[0].icon}.png`)
    day1Date.append(img);


    var daytime1Temp= responseObject.daily[0].temp.day;
    console.log(daytime1Temp);
    //temp day 1
    day1TempSpan.append(daytime1Temp);
    //wind day 1
    var day1Wind=responseObject.daily[0].wind_speed
    day1WindSpan.append(day1Wind);
    //humidity day 1
    var day1Humidity=responseObject.daily[0].humidity;
    day1HumiditySpan.append(day1Humidity);


    // console.log(daytime1Temp);
    // console.log(day1TempSpan);
    // day1TempSpan.innerText =daytime1Temp;
    //day1TempSpan.innerHTML=daytime1Temp;
    // var day2 = moment(date).add(2, 'days');
    //day 1 temp

    console.log(responseObject.daily[0].temp.day);
    console.log(responseObject.daily[0].wind_speed);
    console.log(responseObject.daily[0].humidity);

//     //console.log(responseOject);
//     // fetch(url)
//     // .then(function(fiveDayResponse){
//     //     return fiveDayResponse.json()
//     // })
//     // .then(function(fiveDayResponse){
//     //     console.log(fiveDayResponse);
//     // })

 }



//onload, page will fill page with location specific weather current weather
window.onload = function() {
    //get current lat/long of user
    getCurrentLocation();
    

    //fetch current city name based on coordinates  
};


    //    //add current temp to current day forecast
    //     var temp = response.current.temp;
    //     currentTemp.append(temp +"F");
        

        
        // //add wind speed to current day forecast
        // var wind = response.current.wind_speed;
        // currentWindSpeed.append(wind + " MPH");
        // //add current humidity to current day forecast
        // var humidity = response.current.humidity;
        // currentHumidity.append( humidity + " %");
        // //add current uv index to current day forecast
        // var uvindex = response.current.uvi
        // currentUvIndex.append(uvindex);
        // var img = document.createElement("img");
        // img.setAttribute("src",`http://openweathermap.org/img/w/${response.current.weather[0].icon}.png`)
        // currentTemp.append(img);
    
    //console.log(city);
    //citySpan.innerText =city



//city input and value from submit button
citySearch.addEventListener("click",function(){
    alert("button clicked");
    city = cityInput.value;
    console.log(city);
    
    citySpan.innerText = city;
    
    dateSpan.innerText = date;

    
    currentWeather();
});


var currentWeather = function(){
    //api url 
    const url="https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +"&appid=732c347ea0e41d029999d7150a2a657d&units=imperial"
    console.log(url);
    
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        //add current temp to current day forecast
        var temp = response.current.temp;
        currentTemp.append(temp +"F");
        //add wind speed to current day forecast
        var wind = response.current.wind_speed;
        currentWindSpeed.append(wind + " MPH");
        //add current humidity to current day forecast
        var humidity = response.current.humidity;
        currentHumidity.append( humidity + " %");
        //add current uv index to current day forecast
        var uvindex = response.current.uvi
        currentUvIndex.append(uvindex);
        // var img = document.createElement("img");
        // img.setAttribute("src",`http://openweathermap.org/img/w/${response.current.weather[0].icon}.png`)
        // currentTemp.append(img);
    })
}


//lat and long are determined based on the city and current weather is shown for the city
    //date is populated
    //populate the 5 day forecase
    //city and the api params used saved to localstorage and a btn is created to store the fetch command