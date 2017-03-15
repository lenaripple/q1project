$('document').ready(function(){
  $('#submitForm').on("click", findDate)
  $('#submitForm').on("click", findLocation)
  $('#submitForm').on("click", getForecast)
});

var locations;
var date;
var summary;
var temp;
var hike;
var ski;
var timeZone;
var year;
var month;
var day;
var time = 'T[14]:[00]:[00]'

function findDate(event){
  event.preventDefault()
  date=$('#date').val()
  year = date.slice(0,4)
  month = date.slice(5,7)
  day = date.slice(8,10)
  console.log(date)
}

function findLocation(event){
  event.preventDefault()
  locations=$('#location').val()
  if (locations==='Denver'){
    locations = '39.7392,-104.9903';
    timeZone='America/Denver'
  }
  else if (locations==="Boulder"){
    locations = '40.0150,-105.2705';
    timeZone='America/Denver'
  }
  else if (locations==="Telluride"){
    locations = '37.9375,-107.8123';
    timeZone='America/Denver'

  }
  else if (locations==="Vail"){
    locations ='39.6403,-106.3742';
    timeZone='America/Denver'
  }
  else if (locations==="Portland"){
    locations ='43.6615,-70.2553';
    timeZone='America/New_York'

  }
  parseInt(locations)
  console.log(locations);
}

function getActivity(temp){
 if (temp<32){
   getSkiing()
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
  url +=(locations+'?'+'['+year+']'+'-'+'['+month+']'+'-'+'['+day+']'+time+'?currently')
  console.log(url);
  $.get(url)
  .then(function(data) {
    console.log(data);
    summary = data.daily.summary;
    temp = data.daily.data[0].apparentTemperatureMax
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
    $('.activity').append("The high will be "+temp+" degrees. <br> Forecast is: "+summary+"<br><br>The weather looks pretty lame. Better start drinking! <br> Try this brewery: "+brewery)
    })
  }

function getHike(){
  if (locations==='39.7392,-104.9903'|| locations==='denver'){
    hike = [{name:'Staunton Ranch and Bugling Elk Loop',
            trailhead:'Staunton State Park, 12102 South Elk Creek Road, Pine, CO 80470',
            miles:'8.6 miles long',
            rating: 'rated as a moderate hike'}
          ]
  }
  else if (locations==='40.0150,-105.2705'|| locations==='boulder'){
    hike = [{name:'Shadow Canyon Trail to South Boulder Peak',
            trailhead:'South Mesa Trailhead, 3633-, 4111 Eldorado Springs Dr, Boulder, CO 80303',
            miles:'8.1 miles long',
            rating: 'rated as a difficult hike'}
          ]
  }
  else if (locations==='37.9375,-107.8123'|| locations==='telluride'){
    hike = [{name:'Blue Lakes Trail',
            trailhead:'Blue Lakes Trailhead, Dallas Creek Road off Highway 62',
            miles:'6.3 miles long',
            rating: 'rated as a moderate hike'}
          ]
  }
  else if (locations==='39.6403,-106.3742'|| locations==='vail'){
    hike = [{name:'Berrypicker Trail',
            trailhead:'8 Lionshead Pl, Vail, CO 81657',
            miles:'6.1 miles long',
            rating: 'rated as a difficult hike'}
          ]
  }
  else if (locations==="43.6615,-70.2553"||locations==='portland'){
    hike = [{name:'Mount Katahdin and Hamlin Peak Loop',
            trailhead:'Chimney Pond Trail, Millinocket, ME 04462',
            miles:'10.0 miles long',
            rating: 'rated as a difficult hike'}
          ]
                
  }
  hike = (hike[0].name+', '+hike[0].trailhead+', '+hike[0].miles+', '+hike[0].rating)
    $('.activity').append("The high will be "+temp+" degrees. <br> The weekend forecast is: "+summary+"<br><br>Looks like hiking weather! <br> Check this trail out: "+hike)
  }

function getSkiing(){
  var url = 'http://api.worldweatheronline.com/premium/v1/search.ashx?key=6580809fbcb644169e0212704171403&q='
  url+=(locations+'&wct=Ski&format=json')
  $.get(url)
  .then(function(data){
    console.log(data);
    for (var i = 0; i < 10; i++) {
      var resorts = []
      resorts.push(data[i].search_api.result[i].areaName[i].value)
      return resorts
      // console.log(resorts);
    // ski=data[Math.floor(Math.random()*data.length)]
    // console.log(ski);
    // ski=(data[i].search_api.result[i].areaName[i].value+', '+data[i].search_api.result[i].region[i].value)
  }
  console.log(resorts);
    $('.activity').append("The high will be "+temp+" degrees. <br> Forecast is: "+summary+"<br><br>Looks like awesome skiing weather! <br> Try this resort: "+ski)
  })
  }
// .search_api.result["0"].areaName["0"].value
