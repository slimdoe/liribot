
require("dotenv").config();
var Spotify = require('node-spotify-api');
var fs = require('fs');
var axios = require('axios');
var keys = require("./keys");

var spotify = new Spotify(keys.spotify);

// get arguments from the commmand line
// process.argv
console.log(process.argv)
console.log(process.argv[2])

var command = process.argv[2];
var subCommand = process.argv.slice(3).join(" ");
//console.log(subCommand);

if (command === 'concert-this') {
    console.log("this block of code will do concert-this")
    concertThis()
} else if (command === 'spotify-this-song') {
    console.log('your songs')
    // runSpotify()
} else if (command === 'movie-this') {
    console.log('your movie')
    movieThis()
} else if (command === 'do-what-it-says') {
    console.log('do it now')
    dwis()
} else {
    console.log("command unknown")
}

function dwis() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data.split(','));
        var result = data.split(',');
        console.log(result[0])
        console.log(result[1]);
        command = result[0]
        subCommand = result[1]
        if (command === 'concert-this') {
            console.log("this block of code will do concert-this")
            concertThis()
        } else if (command === 'spotify-this-song') {
            console.log('your songs')
        } else if (command === 'movie-this') {
            console.log('your movie')
            movieThis()
        } else {
            console.log("command unknown")
        }
    });
}
function concertThis() {
    var artist = subCommand || "metallica";
    // if (!subCommand) {
    //     artist = "metallica"
    // }

    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(url)
        .then(function (response) {
            //console.log(response.data);
            var result = response.data[0];
            //console.log(result)
            console.log(artist);
            console.log(result.venue.name);
            console.log(result.venue.city);
            console.log(result.datetime);
        })
        .catch(function (error) {
            console.log(error);
        });
}
function movieThis() {
    var movie = subCommand || "Mr. Nobody";
    var url = 'https://www.omdbapi.com/?apikey=trilogy&t=' + movie

    axios.get(url)
        .then(function (response) {
            console.log(response.data)
            var result = response.data
            console.log(result.Title);
            console.log(result.Year);
            console.log(result.Rated);
            console.log(result.Ratings[1]);
            console.log(result.Country);
            console.log(result.Language);
            console.log(result.Plot);
            console.log(result.Actors);
        })
        .catch(function (error) {
            console.log(error);
        });
};

spotify.search({ type: 'track', limit: 1, query: 'All the Small Things' }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    // console.log(data)
    // console.log(data.tracks.items[0]);
    console.log(data.tracks.items[0].album.artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].album.external_urls.spotify);
    //console.log(data.tracks.items[0].album.artists);

    //artist name
    

});