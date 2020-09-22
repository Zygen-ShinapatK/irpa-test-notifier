var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;
var helmet = require('helmet');
var React = require('react');
var ReactDOM = require('react-dom');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

//pre-flight requests
app.options('*', function (req, res) {
	res.send(200);
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	/* eslint-disable no-console */
	console.log('Node Endpoints working :)');
});

module.exports = server;

app.all('/', (req, res) => {
	if (req.method === 'GET') {
		console.log(req.body);
		res.status(200);

		var jsx = (
			<div>
				<h1>Waiting for POST request</h1>
			</div>
		);

		res.send(ReactDOM.render(jsx, document.getElementById("root")));

	}
	else if (req.method === 'POST') {
		console.log(req.body);
		res.status(200);

		var jsx = (
			<div>
				<h1>Invocation Context</h1>
				<ul>
					<li>{req.body.invocation}</li>
				</ul>
				<h1>Output</h1>
				<ul>
					<li>{req.body.output}</li>
				</ul>
			</div>
		);

		res.send(ReactDOM.render(jsx, document.getElementById("root")));

		// } else if (req.method === 'PUT') {
		// 	console.log(req.body);
		// 	res.status(200);
		// 	res.send(`PUT Request Success!!!`);
	}
});