var express = require('express')
var app = express()
var ejs = require('ejs')
var multer = require('multer')
var upload = multer( { dest: 'uploads/'} )
var mongo = require('mongodb')
var cookie = require('cookie-parser')
var valid = [ ]

app.listen(2000)
app.engine('html', ejs.renderFile)
app.use(cookie())
app.get('/', showIndex)
app.get('/register', showRegister)
app.post('/register', upload.single(), saveNewUser)
app.get('/login', showLogin)
app.post('/login', upload.single(), checkPassword)
app.get('/profile', showProfile)
app.use(express.static('public'))

function showRegister(req, res) {
	res.render('register.html')
}

function saveNewUser(req, res) {
	/*
	mongo.MongoClient.connect('mongodb://icode.run/system1', (error, db) => {
		db.collection('user').insert(req.body)
		res.redirect("/login")
	})
	*/
	res.redirect("/login")
}

function showIndex(req, res) {
	res.render('index.html')
}

function showLogin(req, res) {
	res.render('login.html')
}
function checkPassword(req, res) {
	if (req.body.email == 'mark@facebook.com' && 
		req.body.password == 'mark123') {
		var number = "12345-67890"
		valid[number] = req.body;
		res.set('Set-Cookie', 'card=' + number)
		res.redirect('/profile')
	}
}

function showProfile(req, res) {
	var card = req.cookies.card
	if (valid[card]) {
		res.render('profile.html')
	} else {
		res.redirect('/login')
	}
}
