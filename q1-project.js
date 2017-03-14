$('document').ready(function(){
  $('#submitForm').on("click", findDate)
  $('#submitForm').on("click", findLocation)
  $('#submitForm').on("click", getForecast)
});

var locations;
var date;
var summary;
var temp;

function findDate(event){
  event.preventDefault()
  date=$('#date').val()
  console.log(date);
}

function findLocation(event){
  event.preventDefault()
  locations=$('#location').val()
  if (locations==='Denver'){
    locations = '39.7392,-104.9903'
  }
  else if (locations==="Boulder"){
    locations = '40.0150,-105.2705'
  }
  else if (locations==="Telluride"){
    locations = '37.9375,-107.8123';
  }
  else if (locations==="Vail"){
    locations ='39.6403,-106.3742'
  }
  else if (locations==="Portland"){
    locations ='43.6615,-70.2553'
  }
  parseInt(locations)
  console.log(locations);
}

function getActivity(temp){
 if (temp<32){
   //call skiing api function here
   $('.activity').append("Go skiing!")
 }
 else if (temp>=50) {
   getHike()
 }
 else if (32<temp<50){
   getBeer()
 }
 else {
   $('.activity').append("You should probably start over and try again.")
 }
}

function  getForecast(){
  var url = 'https://galvanize-cors.herokuapp.com/https://api.darksky.net/forecast/5816e128ecf24590e8e5af9d7b34dc03/'
  url +=(locations+'?currently')
  $.get(url)
  .then(function(data) {
    summary = data.daily.summary;
    temp = data.currently.apparentTemperature
    parseInt(temp);
    console.log(summary);
    console.log(temp);
    })
    .then(function(){
      getActivity(temp);
    })
  }

function getBeer(){
  if (locations==='39.7392,-104.9903'){
    locations = 'denver'
  }
  else if (locations==='40.0150,-105.2705'){
    locations = 'boulder'
  }
  else if (locations==='37.9375,-107.8123'){
    locations = 'telluride';
  }
  else if (locations==='39.6403,-106.3742'){
    locations ='vail'
  }
  else if (locations==="43.6615,-70.2553'"){
    locations ='portland'
  }

  var url = 'https://galvanize-cors.herokuapp.com/http://beermapping.com/webservice/locquery/7e4c3dacf3f1e0eef26915dd0acee707&s=json/'
  url+=(locations)
  $.get(url)
  .then(function(data){
    for (var i = 0; i < data.length; i++) {
    brewery=data[Math.floor(Math.random()*data.length)]
    brewery=(data[i].name+', '+data[i].street+', '+data[i].city+', '+data[i].state)
  }
    $('.activity').append("Current temperature is "+temp+". <br> Forecast is: "+summary+"<br>Looks like beer weather! <br> Try this brewery: "+brewery)
    })
  }

  function getHike(){
    // if (locations==='39.7392,-104.9903'){
    //   locations = 'denver'
    // }
    // else if (locations==='40.0150,-105.2705'){
    //   locations = 'boulder'
    // }
    // else if (locations==='37.9375,-107.8123'){
    //   locations = 'telluride';
    // }
    // else if (locations==='39.6403,-106.3742'){
    //   locations ='vail'
    // }
    // else if (locations==="43.6615,-70.2553'"){
    //   locations ='portland'
    // }
    //
    // var url = 'https://galvanize-cors.herokuapp.com/http://beermapping.com/webservice/locquery/7e4c3dacf3f1e0eef26915dd0acee707&s=json/'
    // url+=(locations)
    // $.get(url)
    // .then(function(data){
    //   for (var i = 0; i < data.length; i++) {
    //   brewery=data[Math.floor(Math.random()*data.length)]
    //   brewery=(data[i].name+', '+data[i].street+', '+data[i].city+', '+data[i].state)
    // }
      $('.activity').append("Current temperature is "+temp+". <br> Forecast is: "+summary+"<br>Looks like hiking weather! <br> Check this one out: ")
    }
