(function () {
    'use strict';

    var express = require('express');
    var httpProxy = require('http-proxy');

    var app = express();
    var api = httpProxy.createProxyServer();

    app.use('/rangout', express.static('src/webapp/', {index: false}));
    app.use('/libraries', express.static('node_modules', {index: false}));
    app.use('/assets', express.static('assets/', {index: false}));

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/src/webapp/index.html');
    });

    app.all('/rangout-server/api/*', function (req, res) {
        api.web(req, res, {target: 'http://localhost:8080'}, function (error) {
            res.status(500);
            res.end();
        });
    });

    app.all('/*', function (req, res) {
        res.redirect('/');
    });

    api.on('error', function (err, req, res) {
        res.end();
    });

    app.listen(8081, function () {
        console.log('Initializing web interface at http://localhost:8081\nREST server should be listening at http://localhost:8080');
    });
})();
