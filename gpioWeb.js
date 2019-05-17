
// 5-23-2019 ...
// npm i express
// npm i ip

const express = require('express')
var ip = require('ip');
const app = express();

var portToUse = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ipToUse   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
;

// === is strict-type comparison
/* works without this local pc and cloud.. if (typeof process.env.OPENSHIFT_NODEJS_PORT === "undefined") {
	portToUse = 3000; ipToUse = ip.address();
	console.log("\"process.env.OPENSHIFT_NODEJS_PORT\" not defined");
} else {
	console.log("process.env.OPENSHIFT_NODEJS_PORT defined as: " + process.env.OPENSHIFT_NODEJS_PORT);
} */

console.log("...portToUse: " + portToUse + " ipToUse: " + ipToUse);

// this causes express to serve html, javascript, images etc from the 'public' folder
app.use(express.static('public'))  

// url at /
app.get('/',  function (req, res) {
	res.send('hello abcd');
})

// returns json formatted data depending on the gpioPort specified in URL (rest-style)
// http://zzz.zzzz.zzz.zzz:3000/buttonState/14   where 14 is the gpio port
app.get('/buttonState/:gpioPort', function (req, res) {
	var gpioPort = req.params.gpioPort;
	console.log('request buttonState using gpio port ' + gpioPort);
	///////////////const button2 = new Gpio(gpioPort, 'in', 'both');
	// warning: use ` and NOT '
	res.json({ 'buttonState' : 11111, 'gpioPort' : `${gpioPort}`, 'color' : 'blue' });
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
// run:   node --inspect=zzz.zzzz.zzz.zzz server2.js 
// get url of debug in chrome: ==>>  http://zzz.zzzz.zzz.zzz/json/list
// if running express from windows, need to kill process even after stopping it in window
// run from dos window ==>>  taskkill /F /IM node.exe
//          bash       ==>>  taskkill //F //IM node.exetaskkill //F //IM node.exe
