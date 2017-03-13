$('document').ready(function(){
  $('#submitForm').on("click", findDate)
  $('#submitForm').on("click", findLocation)
  $('#submitForm').on("click", getForecast)
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
  else if (locations==="Fort Collins"){
    locations = '40.5853,-105.0844';
  }
  else if (locations==="Vail"){
    locations ='39.6403,-106.3742'
  }
  parseInt(locations)
  console.log(locations);
}

var summary;

function getActivity(summary){
 var activity = ''
 if (summary.includes('snow')||summary.includes('blizzard')||summary.includes('freezing')){
   activity =  'ski'
   $('body').append("Go skiing!")
 }
 else if (summary.includes('no precipitation')||summary.includes('warm')) {
   activity = 'hike'
   $('body').append('Go for a hike!')
 }
 else if (summary.includes('rain')||summary.includes('dropping')){
   activity = 'drink'
   $('body').append("Check out a brewery!")
 }
}

function  getForecast(){
  var url = 'https://galvanize-cors.herokuapp.com/https://api.darksky.net/forecast/5816e128ecf24590e8e5af9d7b34dc03/'
  url +=(locations+'?currently')
  // console.log(url);
  $.get(url)
  .then(function(data) {
    // console.log(data);
    summary = data.daily.summary
    console.log(summary);
    getActivity(summary)
    })
    .catch(function(error){
      console.log(error);
    })
  }
