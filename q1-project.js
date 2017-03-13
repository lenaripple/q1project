$('document').ready(function(){
  $('#submitForm').on("click", findDate)
  $('#submitForm').on("click", findLocation)
  $('#submitForm').on("click", getForecast);
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
  else if (locations==="Colorado Springs"){
    locations ='38.8339,-104.8214'
  }
  parseInt(locations)
  console.log(locations);
}

function  getForecast(){
  var url = 'https://galvanize-cors.herokuapp.com/https://api.darksky.net/forecast/5816e128ecf24590e8e5af9d7b34dc03/'
  url +=(locations)
  console.log(url);
  $.get(url)
  .then(function(data) {
    console.log(data);
    var summary = data.daily.data.summary;
    updatePage(summary)
    showMessage()
    })
    .catch(function(error){
      console.log(error);
    })
  }

// function updatePage(summary){
//   console.log(summary);
//   $('body').append(summary)
//   }

// function showMessage() {
//   $('body').append('Have fun!')
//   }


// function forecast(weather){
//   weather=type
//   if (weather==='rain'){
//     $('body').append("Check out a brewery!")
//   }
//   else if (weather==='snow'){
//     $('body').append("Go skiing!")
//   }
//   else if (weather==="sunny"){
//     $('body').append('Go for a hike!')
//   }
//   else "Try again, we're all out of ideas."
// }
