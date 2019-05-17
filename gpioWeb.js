
// 9:43 ...
// npm i express
// npm i ip

const express = require('express')
var ip = require('ip');
const app = express();

var portToUse = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ipToUse   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
;

if (process.env.OPENSHIFT_NODEJS_PORT) {
	console.log("process.env.OPENSHIFT_NODEJS_PORT defined as: " + process.env.OPENSHIFT_NODEJS_PORT);
} else {
	portToUse = 3000; ipToUse = ip.address();
	console.log("\"process.env.OPENSHIFT_NODEJS_PORT\" not defined");
}

console.log("portToUse: " + portToUse + " ipToUse: " + ipToUse);

// this causes express to serve html, javascript, images etc from the 'public' folder
app.use(express.static('public'))  

// url at /
app.get('/',  function (req, res) {
	res.send('hello abcd');
})

// returns json formatted data depending on the gpioPort specified in URL (rest-style)
// http://192.168.43.104:3000/buttonState/14   where 14 is the gpio port
app.get('/buttonState/:gpioPort', function (req, res) {
	var gpioPort = req.params.gpioPort;
	console.log('request buttonState using gpio port ' + gpioPort);
	///////////////const button2 = new Gpio(gpioPort, 'in', 'both');
	// warning: use ` and NOT '
	res.json({ 'buttonState' : 11111, 'gpioPort' : `${gpioPort}` });
})

console.log('devtools url; browse here, displays url of debugger: ')
console.log('http://' + ipToUse + ':' + 9229 + '/json/list'
  + '\nhttp://' + ipToUse + ':' + portToUse +
  '\nhttp://' + ipToUse + ':' + portToUse + '/buttonState/14')
// this is what starts up the express Web App Server:
// app.listen(port, function() { console.log(`Example app.. listening on port 3000`);});
app.listen(portToUse, ipToUse);

// other notes:
// use nodemon to auto-restart after saving file
// nodemon server4.js
// to debug using chrome remotely
// run:   node --inspect=192.168.43.104 server2.js 
// get url of debug in chrome: ==>>  http://192.168.43.104/json/list
// if running express from windows, need to kill process even after stopping it in window
// run from dos window ==>>  taskkill /F /IM node.exe
//          bash       ==>>  taskkill //F //IM node.exetaskkill //F //IM node.exe
