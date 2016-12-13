var express = require('express')
var app = express()
var ejs = require('ejs')
app.listen(2000)
app.engine('html', ejs.renderFile)

app.get('/', showIndex)
app.get('/login', showLogin)
app.post('/login', checkPassword)
app.get('/profile', showProfile)

function showIndex(req, res) {
	res.render('index.html')
}

function showLogin(req, res) {
	res.render('login.html')
}
function checkPassword(req, res) {
	var data = ''
	req.on('data', chunk => data += chunk )
	req.on('end', () => {
		var info = {}
		data = decodeURIComponent(data)
		var line = data.split('&')
		for (var field of line) {
			var token = field.split('=')
			if (token[0] == 'email') {
				info.email = token[1]
			}
			if (token[0] == 'password') {
				info.password = token[1]
			}
		}
		if (info.email == 'mark@facebook.com' &&
			info.password == 'mark123') {
			// generate new card id
			// set cookie by card id
			// save card id to our grant table
			res.redirect('/profile')
		} else {
			res.redirect('/login?error=Invalid')
		}
	})
}

function showProfile(req, res) {
	/*
	if (user.loggedIn) {
		render profile.html
	} else {
		redirect user to the login page
	}
	*/
	res.render('profile.html')
}
