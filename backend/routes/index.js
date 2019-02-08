// import
var express = require('express')
var execQuery = require('./db.js')
const session = require('express-session')

var router = express.Router();

// express setting
const app = express()
app.use(express.static(__dirname + '/public')) 
app.use(express.json())
app.use(session({secret:'keyboard cat', cookie: {maxAge: 60000*30}}))

/* routing */
app.get('/', (req, res) => {
	res.render('/index')
});


// server start
app.listen(8080)
module.exports = router