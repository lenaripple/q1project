$('document').ready(function(){
  $('#submitForm').on("click", findDate)
  $('#submitForm').on("click", findLocation)
  $('#submitForm').on("click", getForecast)
  $('#submitForm').on("click", getBeer)

});

var locations;
var date;

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
  parseInt(locations)
  console.log(locations);
}

var summary;
function getActivity(summary){
 summary = summary.toLowerCase()
 if (summary.includes('snow')||summary.includes('blizzard')||summary.includes('freezing')){
   $('body').append("Go skiing!")
 }
 else if (summary.includes('no precipitation')||summary.includes('warm')) {
   //call hiking api function here
   $('body').append('Go for a hike!')
 }
 else if (summary.includes('rain')||summary.includes('dropping')){
   getBeer()
 }
 else {
   $('body').append("You should probably start over and try again.")
 }
}

function  getForecast(){
  var url = 'https://galvanize-cors.herokuapp.com/https://api.darksky.net/forecast/5816e128ecf24590e8e5af9d7b34dc03/'
  url +=(locations+'?currently')
  $.get(url)
  .then(function(data) {
    summary = data.daily.summary
    console.log(summary);
    })
    .catch(function(error){
      console.log(error);
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
    locations = 'Telluride';
  }
  else if (locations==='39.6403,-106.3742'){
    locations ='vail'
  }
  var url = 'https://galvanize-cors.herokuapp.com/http://beermapping.com/webservice/locquery/7e4c3dacf3f1e0eef26915dd0acee707&s=json/'
  url+=(locations)
  $.get(url)
  .then(function(data){
    for (var i = 0; i < data.length; i++) {
    brewery=data[Math.floor(Math.random()*data.length)]
    brewery=(data[i].name+', '+data[i].street+', '+data[i].city+', '+data[i].state)
  }
    $('body').append("Looks like beer weather!  Try this brewery: "+brewery)
    })
    .catch(function(error){
      console.log(error);
    })
  }
