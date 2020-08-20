const fs = require('fs') 
var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var os = require("os");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var cookieParser = require('cookie-parser');
app.use(cookieParser());

let lflag = 0;

let random_k = 9;
 
// Running Server Details.
var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});

var crypto = require('crypto');

var generate_key = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};

let quotes = ['Don\'t miss the details','Judge :: Suicide','May there be peace','The most wisest are the most ignorant','The war is coming','Let the war begin','The wants of the soul are never ending','Beauty is in the emptiness','The Ocean is full of greed, don\'t be a part of it','So, what is it gonna be ? Death or ?','It\'s all an illusion','The rope can break at anytime']; 

app.use(express.static(__dirname + '/public'));

app.disable('x-powered-by');

app.set('view engine', 'jade');

sessionso = []

app.get('/l', urlencodedParser, function (req, res){
	 res.render('l');
	 });
app.get('/bot', urlencodedParser, function (req, res){
	 res.sendfile('bot.exe');
	 });
	 
app.get('/commands', urlencodedParser, function (req, res){
	if((sessionso.length) > 0 && (sessionso.includes(req.cookies.sas.toString()))){
	res.render('commands');}
	else{res.send('...?');}
	 });
app.get('/logout',urlencodedParser, function (req, res){
	if((sessionso.length)){
	let indx = sessionso.indexOf(req.cookies.sas.toString());
	if(indx >= 0) { sessionso[indx] = ''; }}
	 console.log(sessionso);
	 res.send('logged out successfully');
});

app.get('/', function (req, res){
	console.log(sessionso);
	if(!(sessionso.length) || (!(sessionso.includes(req.cookies.sas.toString())))){
	res.send('...?');}
	else{
		res.render('index', {hello: quotes[Math.floor(Math.random() * 10)]})};
});

app.post('/', function(req, res){
   console.log(Users);
   if(!req.body.key1){
      res.send('... ?');
   } else {
      Users.filter(function(user){
         if(user.id === req.body.key1){
            req.session.user = user;
              res.render('index', {hello: quotes[Math.floor(Math.random() * 10)]} );
         }
      });
      res.send('... ?');
   }
});
	 
app.post('/darude', urlencodedParser, function (req, res){
	if(req.body.p == "swipernoswiping"){
	 let j = fs.readFileSync('views/darude', 'utf8');
	res.send(j);}
	else{
	res.send("Fuck away, Nigga.");
	}
});
 
app.post('/', urlencodedParser, function (req, res){
  if(req.body.key1 == "letmein"){
  var reply='';
  random_k = generate_key();
  console.log(random_k);
  res.cookie("sas",random_k.toString());
  sessionso.push(random_k.toString());
  console.log(random_k);
  console.log(sessionso);
  console.log(req.cookies);
  lflag = 1;
  reply += req.body.key;
  fs.writeFile('views/darude', reply);
  reply += '\n';
  fs.appendFile('n.txt', reply);
  res.render('index', {hello: quotes[Math.floor(Math.random() * 10)]} );
	}
  else{
	  res.send("... ?");
  }
 });
 
 app.post('/commands', urlencodedParser, function (req, res){
  if(((sessionso.length) && ((sessionso.includes(req.cookies.sas.toString()))))){
  var reply='';
  reply += req.body.com;
  fs.writeFile('views/darude', reply);
  reply += '\n';
  fs.appendFile('n.txt', reply);
  res.render('commands', {hello: 'Command \'' + req.body.com + '\' sent successfully.'} );
	}
  else{
	  res.send("... ?");
  }
 });
 
 module.exports = app;
 module.exports = lflag;