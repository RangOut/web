(function () {
    'use strict';

    var express = require('express');
    var request = require('request');

    var app = express();

    app.use('/rangout', express.static('src/webapp/', {index: false}));
    app.use('/libraries', express.static('node_modules', {index: false}));
    app.use('/assets', express.static('assets/', {index: false}));

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/src/webapp/index.html');
    });

    app.all('/rangout-server/api/*', function (req, res) {
        var url = 'http://localhost:8080' + req.url.split("/rangout-server")[1];
        req.pipe(request(url)).pipe(res);
    });

    app.all('/*', function (req, res) {
        res.redirect('/');
    });

    app.listen(8081, function () {
        console.log('Initializing web interface at http://localhost:8081\nREST server should be listening at http://localhost:8080');
    });
})();
