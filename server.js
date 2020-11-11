var http = require('http');
var seaport =  require('seaport');
var seaporttConnect = seaport.connect('localhost', 9090);

// Her skal der være noget funktionalitet
function sumOfNumbers () {
    var sum = 0;
    for (var x = 0; x < 100000; x++) {
        sum += x;
    }
    return sum;
}

var server = http.createServer(function (req, res) {
    /* Vi laver et response, hvori at vi som det første kalder sumOfNumbers(), som er vores øvre
    funktion. Derudover så kaldes porten også, selve porten findes vha. funktioen server.address(),
    denne specificeres til vores server, derfor erstattes "server" med "this". Her bruges res.end, idet
    at det er det sidste som serveren skal sende afsted
     */
    res.end("Server 1: Sum: " + sumOfNumbers() + ", port: " + this.address().port)
});


// Her laves ydeligere server
var server1 = http.createServer(function (req, res) {
    res.end("Server 2: " + this.address().port)
});


// Her laves ydeligere server
var server2 = http.createServer(function (req, res) {
    res.end("Server 3: " + this.address().port)
});




// Serveren lytter til den port som er specificeret i seaport
server.listen(seaporttConnect.register('server', 'server1', 'server2'), function () {
    console.log('Server is listening on this port: ' + this.address().port);
});

