var citySearch = document.querySelector("#submit");
var cityInput = document.querySelector("#floatingTextarea")
var currentTemp = document.querySelector("#current-temp");
var currentWindSpeed = document.querySelector("#current-wind-speed");
var currentHumidity = document.querySelector("#current-humidity");
var currentUvIndex = document.querySelector("#current-uv-index");
var citySpan = document.getElementById('city');
var dateSpan = document.getElementById('date');
var currDate = new Date();
var dd = currDate.getDate();
var mm = currDate.getMonth()+1;
var yyyy = currDate.getFullYear();
var PDate = mm+'/'+dd+'/'+yyyy;




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
            //populate date
            dateSpan.innerText = PDate;
            

            lat = response.latitude
            long = longitude;
            console.log( lat + "lat")
            console.log( long + "long")
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long +"&appid=732c347ea0e41d029999d7150a2a657d&units=imperial")
            .then(function(response){
                return response.json()
            })
            .then(function(response){

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
                
                //set fetch response to object
                responseObject = response;
                console.log(responseObject)

                //call 5 day to fill out location specific 5 day forecast
                fiveDayforecast(responseObject);
                
                
            })
        })
    })
};

var fiveDayforecast =function(){
    
    // var currDate = new Date(); 
    // console.log(currDate);
    // var dd = currDate.getDate();
    // var mm = currDate.getMonth()+1;
    // var yyyy = currDate.getFullYear();

    //console.log(mm,dd,yyyy)

    for(var i = 0; i < 5; i++){
        //set dates on five day forecast
        var fiveDayDate =document.querySelector("#date"+i);
        dd = dd+ 1;
        var vDate = mm+'/'+dd+'/'+yyyy; 
        fiveDayDate.innerText = vDate;

        //set images of weather to dates
        var img = document.createElement("img");
        //console.log(`http://openweathermap.org/img/w/${responseObject.daily[i].weather[0].icon}.png`)
        img.setAttribute("src",`http://openweathermap.org/img/w/${responseObject.daily[i].weather[0].icon}.png`)
        fiveDayDate.append(img)


        //set temps on five day forecast
        var fiveDayTemp =document.querySelector("#temp"+i);
        var fTemp =responseObject.daily[i].temp.day;
        fiveDayTemp.innerText ="Temp: " + fTemp + " F";

        //set wind speed on five day forecast
        var fiveDayWind = document.querySelector("#wind"+i);
        var fWind =responseObject.daily[i].wind_speed;
        fiveDayWind.innerText = "Wind: "+ fWind + " MPH"
        
        //set humidity on five day forecast
        var fiveDayHumidity = document.querySelector("#humid"+i);
        var fHumid = responseObject.daily[i].humidity;
        fiveDayHumidity.innerText = "Humidity: " + fHumid + " %"  
    }  
};

//onload, page will fill page with location specific weather current weather
window.onload = function() {
    getCurrentLocation();  
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

    //reassign city to requested city
    citySpan.innerText = city;
    
    

    
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
        // var img = document.createElement("img");
        // console.log(img.setAttribute("src",`http://openweathermap.org/img/w/${response.current.weather[0].icon}.png`));
        // currentTemp.append(img);
    })
}


//lat and long are determined based on the city and current weather is shown for the city
    //date is populated
    //populate the 5 day forecase
    //city and the api params used saved to localstorage and a btn is created to store the fetch command