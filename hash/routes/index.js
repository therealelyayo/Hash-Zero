var express = require('express');
var router = express.Router();
let a = require('../app.js');

let lflag = 1;

router.get('/', function (req, res){
	let quotes = ['May there be peace','The most wisest are the most ignorant','The war is coming','Let the war begin','The wants of the soul are never ending','Beauty is in the emptiness','The Ocean is full of greed, don\'t be a part of it','So, what is it gonna be ? Death or ?','It\'s all an illusion','The rope can break at anytime']; 

	if(lflag != 1){
	res.send('...?');}
	else{
		let h = quotes[Math.floor(Math.random() * 10)];
		console.log(h);
		res.render('index', {locals:{quote: h}});
	}
	 });
	 


module.exports = router;
