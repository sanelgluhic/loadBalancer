var http = require('http');
var httpProxy = require('http-proxy');
var seaport = require('seaport');
var seaportConnect = seaport.connect('localhost', 9090);

var proxy = new httpProxy.createProxyServer({});
var i = - 1;
var addresses = [];

var server = http.createServer(function (req, res) {
    addresses = seaportConnect.query("server", "server1","server2" );
    if (addresses.length == 0) {
        res.end("Connection closed");
    }
    i = (i + 1) % addresses.length; // hver gang der kommer et request ind, bliver det sendt til forskellige server ligelidt.
    var host = addresses[i].host.split(":").reverse()[0];
    var port = addresses[i].port;
    proxy.web(req, res, { target: 'http://' + host + ':' + port });
});


server.listen(8080, function () {
    console.log("loadbalance is listening");
});

