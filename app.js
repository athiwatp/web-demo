var express = require('express')
var app = express()
var ejs = require('ejs')
var multer = require('multer')
var upload = multer( { dest: 'uploads/'} )
var mongo = require('mongodb')
var cookie = require('cookie-parser')
var fs = require('fs')
var mysql = require('mysql')
var db = {
	host: '130.211.137.81',
	user: 'web',
	password: 'web123',
	database: 'web'
}
var pool = mysql.createPool(db)
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
app.get('/logout', userLogOut)
app.get('/new', showNew)
app.post('/new', upload.single('photo'), postTopic)
app.use(express.static('public'))

function showRegister(req, res) {
	res.render('register.html')
}

function saveNewUser(req, res) {
	pool.query(`insert into member (email, password, name)
		values(?, sha2(?, 512), ?)`,
		[req.body.email, req.body.password, req.body.name],
		(error, data) => {
			res.redirect("/login")
		}
	)
}

function showIndex(req, res) {
	res.render('index.html')
}

function showLogin(req, res) {
	res.render('login.html')
}
function checkPassword(req, res) {
	pool.query(`select * from member where email=? and 
		password=sha2(?, 512)`,
		[req.body.email, req.body.password],
		(error, data) => {
			if (data.length == 1) {
				var number = "12345-67890"
				valid[number] = req.body;
				res.set('Set-Cookie', 'card=' + number)
				res.redirect('/profile')
			} else {
				res.redirect('/login?message=Invalid Email or Password')
			}
		})
}

function showProfile(req, res) {
	var card = req.cookies.card
	if (valid[card]) {
		res.render('profile.html')
	} else {
		res.redirect('/login')
	}
}

function userLogOut(req, res) {
	delete valid[req.cookies.card]
	res.redirect('/')
}

function showNew(req, res) {
	var card = null
	if (req.cookies && req.cookies.card) {
		card = req.cookies.card
	}
	if (valid[card]) {
		res.render('new.html')
	} else {
		res.redirect('/login')
	}
}

function postTopic(req, res) {
	if (valid[req.cookies.card]) {
		if (req.file && req.file.mimetype == 'image/jpeg') {
			fs.rename(req.file.path, req.file.path + '.jpg')
		}
		if (req.file && req.file.mimetype == 'image/png') {
			fs.rename(req.file.path, req.file.path + '.png')
		}
		res.redirect('/profile')
	} else {
		res.redirect('/login')
	}
}