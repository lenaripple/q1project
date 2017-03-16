$('document').ready(function() {
    $('#submitForm').on("click", findDate)
    $('#submitForm').on("click", findLocation)
    $('#submitForm').on("click", getForecast)
    $('#submitForm').on("click", clearPage)
});

var locations;
var date;
var summary;
var temp;
var hike;
var ski;
var year;
var month;
var day;
var time = 'T[14]:[00]:[00]'
var img = document.createElement('img');

function findDate(event) {
    event.preventDefault()
    date = $('#date').val()
    year = date.slice(0, 4)
    month = date.slice(5, 7)
    day = date.slice(8, 10)
}

function findLocation(event) {
    event.preventDefault()
    locations = $('#location').val()
    if (locations === 'Denver') {
        locations = '39.7392,-104.9903';
    } else if (locations === "Boulder") {
        locations = '40.0150,-105.2705';
    } else if (locations === "Telluride") {
        locations = '37.9375,-107.8123';
    } else if (locations === "Vail") {
        locations = '39.6403,-106.3742';
    } else if (locations === "Burlington") {
        locations = '44.4759,-73.2121';
    }
    parseInt(locations)
    console.log(locations);
}

function getActivity(temp) {
    if (temp < 32) {
        getSkiing()
    } else if (temp >= 50) {
        getHike()
    } else if (32 < temp < 50) {
        getBeer()
    } else {
        $('.activity').append("You should probably start over and try again.")
    }
}

function getForecast() {
    var url = 'https://galvanize-cors.herokuapp.com/https://api.darksky.net/forecast/5816e128ecf24590e8e5af9d7b34dc03/'
    url += (locations + '?' + '[' + year + ']' + '-' + '[' + month + ']' + '-' + '[' + day + ']' + time + '?currently')
    $.get(url)
        .then(function(data) {
            console.log(data);
            summary = data.currently.summary;
            temp = data.daily.data[0].apparentTemperatureMax
            parseInt(temp);
            console.log(summary);
            console.log(temp);
        })
        .then(function() {
            getActivity(temp);
        })
}

function getSkiing() {
    img.src = 'https://telluridecoloradorealestate.files.wordpress.com/2012/11/skirg12_res17_telluride_r12.jpg'
    var url = 'https://api.worldweatheronline.com/premium/v1/search.ashx?key=6580809fbcb644169e0212704171403&q='
    url += (locations + '&wct=Ski&format=json')
    $.get(url)
        .then(function(data) {
            resortList = data.search_api.result
            var randomResort = resortList[Math.floor(Math.random() * resortList.length)]
            ski = (randomResort.areaName["0"].value + ', ' + randomResort.region["0"].value)
            $('.activity').append("The high will be " + temp + " degrees. <br> Forecast is: " + summary + "<br><br>Looks like awesome skiing weather! <br> Try this resort: " + ski)
        })
    $('.photo').append(img)
}

function getBeer() {
    img.src = 'http://dicksbeer.com/wp-content/uploads/2014/09/brewerytour22.png'
    if (locations === '39.7392,-104.9903') {
        locations = 'denver'
    } else if (locations === '40.0150,-105.2705') {
        locations = 'boulder'
    } else if (locations === '37.9375,-107.8123') {
        locations = 'telluride';
    } else if (locations === '39.6403,-106.3742') {
        locations = 'vail'
    } else if (locations === "44.4759,-73.2121'") {
        locations = 'burlington'
    }
    var url = 'https://galvanize-cors.herokuapp.com/http://beermapping.com/webservice/locquery/7e4c3dacf3f1e0eef26915dd0acee707&s=json/'
    url += (locations)
    $.get(url)
        .then(function(data) {
            console.log(data);
            var brewery = data[Math.floor(Math.random() * data.length)]
            goTo = (brewery.name + ', ' + brewery.street + ', ' + brewery.city + ', ' + brewery.state)
            $('.activity').append("The high will be " + temp + " degrees. <br> Forecast is: " + summary + "<br><br>The weather is just okay. It's a good day to try a new brewery! <br> Try this place: " + goTo)
        })
    $('.photo').append(img)
}

function getHike() {
    if (locations === '39.7392,-104.9903' || locations === 'denver') {
        hike = [{
            name: 'Staunton Ranch and Bugling Elk Loop',
            trailhead: 'Staunton State Park, 12102 South Elk Creek Road, Pine, CO 80470',
            miles: '8.6 miles long',
            rating: 'rated as a moderate hike',
            img: img.src = '//4.bp.blogspot.com/-kUmhzB7iTLs/U5aFAeWoyiI/AAAAAAAAHbQ/YdxQMdBbDvo/s1600/DSC00104-1.jpg'
        }]
    } else if (locations === '40.0150,-105.2705' || locations === 'boulder') {
        hike = [{
            name: 'Shadow Canyon Trail to South Boulder Peak',
            trailhead: 'South Mesa Trailhead, 3633-4111 Eldorado Springs Dr, Boulder, CO 80303',
            miles: '8.1 miles long',
            rating: 'rated as a difficult hike',
            img: img.src = 'http://www.danieljoderphotography.com/wp-content/uploads/2014/11/201411206257-eThe-View-South-at-Sunrise.jpg'
        }]
    } else if (locations === '37.9375,-107.8123' || locations === 'telluride') {
        hike = [{
            name: 'Blue Lakes Trail',
            trailhead: 'Blue Lakes Trailhead, Dallas Creek Road off Highway 62',
            miles: '6.3 miles long',
            rating: 'rated as a moderate hike',
            img: img.src = 'https://cdn.apstatic.com/photos/hike/27/4/7002704_smallMed_49d3ca1429029345.jpg'
        }]
    } else if (locations === '39.6403,-106.3742' || locations === 'vail') {
        hike = [{
            name: 'Berrypicker Trail',
            trailhead: '8 Lionshead Pl, Vail, CO 81657',
            miles: '6.1 miles long',
            rating: 'rated as a difficult hike',
            img: img.src = 'https://17410-presscdn-0-76.pagely.netdna-cdn.com/wp-content/uploads/2015/06/BerryPicker.jpg'
        }]
    } else if (locations === "44.4759,-73.2121" || locations === 'burlington') {
        hike = [{
            name: 'Mount Mansfield Loop Trail',
            trailhead: '2236-2428 Mountain Rd, Underhill, VT 05489',
            miles: '8.0 miles long',
            rating: 'rated as a difficult hike',
            img: img.src = 'https://robmcwilliams.files.wordpress.com/2014/12/top-of-sunset-ridge-trail-mt-mansfield.jpg'
        }]
    }
    recommendedHike = [hike[0].name, hike[0].trailhead, hike[0].miles, hike[0].rating]
    photo = hike[0].photo
    $('.activity').append("The high will be " + temp + " degrees. <br> The weekend forecast is: " + summary + "<br><br>Looks like hiking weather! <br> Check this trail out: " + recommendedHike[0] + ' at ' + recommendedHike[1] + '.  It is ' + recommendedHike[2] + ' and is ' + recommendedHike[3] + '.')
    $('.photo').append(img)
}

function clearPage() {
    $('.activity').empty()
    $('.photo').empty()
}
