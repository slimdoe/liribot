
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
    runSpotify()
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

let runSpotify = function () {
    let songName = process.argv.slice(3).join("+");
    spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
        if (err) {
            fs.appendFileSync('log.txt', `Error occurred: ${err}`, 'utf8');
            return console.log(`Error occurred: ${err}`);
        }

        for (let i = 0; i < data.tracks.items.length; i++) {
            console.log(`
            Song Title: ${data.tracks.items[i].name}`);
            fs.appendFileSync('log.txt', `
            Song Title: ${data.tracks.items[i].name}`, 'utf8');

            console.log(`
            Album Title: ${data.tracks.items[i].album.name}`);
            fs.appendFileSync('log.txt', `
            Album Title: ${data.tracks.items[i].album.name}`, 'utf8');

            console.log(`
            Artist(s) Name: ${data.tracks.items[i].artists[0].name}`);
            fs.appendFileSync('log.txt', `
            Artist(s) Name: ${data.tracks.items[i].artists[0].name}`, 'utf8');

            console.log(`
            Preview URL: ${data.tracks.items[i].preview_url}`);
            fs.appendFileSync('log.txt', `
            Preview URL: ${data.tracks.items[i].preview_url}
            /n`, 'utf8');
        }
    });
};
