var citySearch = document.querySelector("#submit");
var cityInput = document.querySelector("#floatingTextarea")
var currentTemp = document.querySelector("#current-temp");
var currentWindSpeed = document.querySelector("#current-wind-speed");
var currentHumidity = document.querySelector("#current-humidity");
var currentUvIndex = document.querySelector("#current-uv-index");
var pastSearch = document.querySelector('.past-search');
var citySpan = document.getElementById('city');
var dateSpan = document.getElementById('date');
var currDate = new Date();
var dd = currDate.getDate();
var mm = currDate.getMonth()+1;
var yyyy = currDate.getFullYear();
var PDate = mm+'/'+dd+'/'+yyyy;
var weeklyWeather;
var longitude;
var latitude;
var latCurrentLocal;
var longCurrentLocal;
var count = -1;
var storageObj =[];
var responseObject;
var currentCityUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + latCurrentLocal + "&longitude="+ longCurrentLocal +"&localityLanguage=en"
//var url="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long +"&appid=732c347ea0e41d029999d7150a2a657d&units=imperial"

//onload, page will fill page with location specific weather current weather
window.onload = function() {
    getCurrentLocation(); 
    historyButtons();
};

//gets current location based off of geolocation
var getCurrentLocation = function(){
    //get current location
    navigator.geolocation.getCurrentPosition(function(position) {
        latCurrentLocal = position.coords.latitude;
        longCurrentLocal = position.coords.longitude;
        console.log(latCurrentLocal + " current lat")
        console.log(longCurrentLocal + " current long");
        //fetch geocode with latCurrentLocal and longCurrentLocal for search terms
        fetch(currentCityUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            console.log(response);

            //pull current city from response and set to citySpan
            var currentCity =response.city;
            citySpan.innerText = currentCity;

            //populate date
            dateSpan.innerText = PDate;
            
            //use latCurrentLocal and longCurrentLocal as parameters for search  in fetch
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latCurrentLocal + "&lon=" + longCurrentLocal +"&appid=732c347ea0e41d029999d7150a2a657d&units=imperial")
            .then(function(response){
                return response.json()
            })
            .then(function(response){
                //returns response with temperature data for current latitude and longitude
                console.log(response);

                //current weather image
                var img = document.createElement("img");
                console.log(`http://openweathermap.org/img/w/${response.current.weather[0].icon}.png`)
                img.setAttribute("src",`http://openweathermap.org/img/w/${response.current.weather[0].icon}.png`)
                citySpan.append(img)

                // local temp
                var temp = response.current.temp;
                currentTemp.innerText = "Temp: " + temp +" F";

                // local wind speed
                var wind = response.current.wind_speed;
                currentWindSpeed.innerText = "Wind: " + wind + " MPH";

                //local humidity    
                var humidity = response.current.humidity;
                currentHumidity.innerText = "Humidity: " + humidity + " %";

                //local uv index
                var uvindex = response.current.uvi
                currentUvIndex.innerText = "UV Index: " + uvindex;
                    if(uvindex<=2){
                        currentUvIndex.setAttribute("class" , "goodUv");

                    }
                    else if(uvindex > 2 && uvindex < 8){
                        currentUvIndex.setAttribute("class" , "moderateUv");
                    }
                    else{
                        
                        currentUvIndex.setAttribute("class" , "dangerousUv");
                    }
                
                //set fetch response to object
                responseObject = response;
                console.log(responseObject)


                //populate 5 day current location forecast
                var currDate = new Date(); 
                console.log(currDate);
                var dd = currDate.getDate();
                var mm = currDate.getMonth()+1;
                var yyyy = currDate.getFullYear();
            
                console.log(mm,dd,yyyy)
            
                for(var i = 0; i < 5; i++){
                    //set dates on five day forecast
                    var fiveDayDate =document.querySelector("#date"+i);
                    dd = dd+ 1;
                    var vDate = mm+'/'+dd+'/'+yyyy; 
                    fiveDayDate.innerText = vDate;
            
                    //set images of weather to dates
                    var img = document.createElement("img");
                    
                    console.log(`http://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png`)
                    img.setAttribute("src",`http://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png`)
                    fiveDayDate.append(img)
            
            
                    //set temps on five day forecast
                    var fiveDayTemp =document.querySelector("#temp"+i);
                    var fTemp =response.daily[i].temp.day;
                    fiveDayTemp.innerText ="Temp: " + fTemp + " F";
            
                    //set wind speed on five day forecast
                    var fiveDayWind = document.querySelector("#wind"+i);
                    var fWind =response.daily[i].wind_speed;
                    fiveDayWind.innerText = "Wind: "+ fWind + " MPH"
                    
                    //set humidity on five day forecast
                    var fiveDayHumidity = document.querySelector("#humid"+i);
                    var fHumid = response.daily[i].humidity;
                    fiveDayHumidity.innerText = "Humidity: " + fHumid + " %" 
                }
                
                
            }
        )})
    })
};

var historyButtons = function(){
    storageObj = JSON.parse(localStorage.getItem('storageObj'));
    console.log(storageObj.length);
    
    for(var i =0; i < storageObj.length; i++){
        var cityBtn = document.createElement("button"); 
        cityBtn.setAttribute("id", i);
        // cityBtn.setAttribute("class", "cityBtnChoice")
        cityBtn.innerText = storageObj[i].cityInfo;
        cityBtn.value = storageObj[i].cityURL;
        pastSearch.append(cityBtn);

    }  
}


//city input and value from submit button
citySearch.addEventListener("click",function(){
    alert("button clicked");
    //count++;

 
    
    city = cityInput.value;
    var cityBtn = document.createElement("button");
    //cityBtn.setAttribute("id", "Btn"+count);
    cityBtn.innerText = city;
    pastSearch.append(cityBtn);
    console.log(city);

    //reassign city to requested city
    citySpan.innerText = city;


    //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    console.log("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=732c347ea0e41d029999d7150a2a657d&units=imperial")
    cityURL ="http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=732c347ea0e41d029999d7150a2a657d&units=imperial"
    
    storageObj.push({cityInfo:city,cityURL});
    console.log(storageObj);
    //localStorage.setItem('searches', storageObj);
    localStorage.setItem('storageObj',JSON.stringify(storageObj));
    


    fetch(cityURL)
    .then(function(response){
        return response.json()
    })
    .then(function(response){
        console.log(response);
        //set latitude and longitude equal to city coordinates
        latitude = response[0].lat;
        longitude = response[0].lon;
        console.log("lat " + latitude);
        console.log("long " + longitude);
        // responseObject = response;
        // console.log(responseObject);
        currentWeather();
    })
    
});


$(".past-search").on("click", function(e){
    alert("button clicked")
    var selected =e.target.id;
    cityURL = storageObj[selected].cityURL;
    console.log(cityURL);
    fetch(cityURL)
    .then(function(response){
        return response.json()
    })
    .then(function(response){
        console.log(response);
        latitude = response[0].lat;
        longitude= response[0].lon;
        city =response[0].name;
        citySpan.innerText = city;
        console.log("latitude: " + latitude)
        console.log("longitude: " + longitude);
        currentWeather();
    })
    
})

var fiveDayforecast =function(){
    console.log("lat " + latitude);
    console.log("long " + longitude);
    var currDate = new Date(); 
    console.log(currDate);
    var dd = currDate.getDate();
    var mm = currDate.getMonth()+1;
    var yyyy = currDate.getFullYear();

    console.log(mm,dd,yyyy)
    console.log(weeklyWeather);

    for(var i = 0; i < 5; i++){
        //set dates on five day forecast
        var fiveDayDate =document.querySelector("#date"+i);
        dd = dd+ 1;
        var vDate = mm+'/'+dd+'/'+yyyy; 
        fiveDayDate.innerText = vDate;

        //set images of weather to dates
        var img = document.createElement("img");
        
        //console.log(`http://openweathermap.org/img/w/${responseObject.daily[i].weather[0].icon}.png`)
        img.setAttribute("src",`http://openweathermap.org/img/w/${weeklyWeather[i].weather[0].icon}.png`)
        fiveDayDate.append(img)


        //set temps on five day forecast
        var fiveDayTemp =document.querySelector("#temp"+i);
        var fTemp =weeklyWeather[i].temp.day;
        fiveDayTemp.innerText ="Temp: " + fTemp + " F";

        //set wind speed on five day forecast
        var fiveDayWind = document.querySelector("#wind"+i);
        var fWind =weeklyWeather[i].wind_speed;
        fiveDayWind.innerText = "Wind: "+ fWind + " MPH"
        
        //set humidity on five day forecast
        var fiveDayHumidity = document.querySelector("#humid"+i);
        var fHumid = weeklyWeather[i].humidity;
        fiveDayHumidity.innerText = "Humidity: " + fHumid + " %"  
    }  
};


var currentWeather = function(){
    //api url 
    console.log(latitude);
    console.log(longitude);
    const url="https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +"&appid=732c347ea0e41d029999d7150a2a657d&units=imperial"
    console.log(url);
    
    //use openWeather api with requested city latitude and longitude
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(response){

        console.log(response);
        weeklyWeather = response.daily;
        //add current temp to current day forecast
        var temp = response.current.temp;
        currentTemp.innerText= "Temp: " + temp +"F";
        //add wind speed to current day forecast
        var wind = response.current.wind_speed;
        currentWindSpeed.innerText = "Wind: "+ wind + " MPH";
        //add current humidity to current day forecast
        var humidity = response.current.humidity;
        currentHumidity.innerText = "Humidity: " + humidity + " %";
        //add current uv index to current day forecast
        var uvindex = response.current.uvi
        currentUvIndex.innerText ="UV Index: " + uvindex;

        if(uvindex<=2){
            
            // currentUvIndex.removeAttribute("moderateUv");
            // currentUvIndex.removeAttribute("dangerousUv");
            currentUvIndex.setAttribute("class" , "goodUv");

        }
        else if(uvindex > 2 && uvindex < 8){
            
            // currentUvIndex.removeAttribute("goodUv");
            // currentUvIndex.removeAttribute("dangerousUv");
            currentUvIndex.setAttribute("class" , "moderateUv");
        }
        else{
            
            // currentUvIndex.removeAttribute("moderateUv");
            // currentUvIndex.removeAttribute("goodUv");
            currentUvIndex.setAttribute("class" , "dangerousUv");
        }
        var img = document.createElement("img");
        img.setAttribute("src",`http://openweathermap.org/img/w/${response.current.weather[0].icon}.png`);
        citySpan.append(img)
        fiveDayforecast();
    })
    
}



/////////LEFT TO DO////////

    
    //save city(Key) and api search url(value) in local storage
    //upon refresh, function to return local storage Key/Value pairs

    //Bonus- Create button to go back to current city//

