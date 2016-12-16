var mysql = require('mysql')
var info = {
	host: '130.211.137.81',
	user: 'web',
	password: 'web123',
	database: 'web'
}
var pool = mysql.createPool(info)
pool.query('select * from member', show)
function show(error, data) {
	console.log(data)
}