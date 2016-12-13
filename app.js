var express = require('express')
var app = express()
var ejs = require('ejs')
app.listen(2000)
app.engine('html', ejs.renderFile)

app.get('/', showIndex)
app.get('/login', showLogin)

function showIndex(req, res) {
	res.render('index.html')
}

function showLogin(req, res) {
	res.render('login.html')
}