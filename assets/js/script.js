var citySearch = document.querySelector("#submit");
var cityInput = document.querySelector("#floatingTextarea")
var currentTemp = document.querySelector("#current-temp");
var currentWindSpeed = document.querySelector("#current-wind-speed");
var currentHumidity = document.querySelector("#current-humidity");
var currentUvIndex = document.querySelector("#current-uv-index");
var citySpan = document.getElementById('city');
var dateSpan = document.getElementById('date');
var date = moment(date).format('M/D/YYYY');
var longitude =-96.808891;
var latitude=32.779167;




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




    //lat and long are determined based on the city and current weather is shown for the city
    //date is populated
    //populate the 5 day forecase
    //city and the api params used saved to localstorage and a btn is created to store the fetch command/key
}



   








