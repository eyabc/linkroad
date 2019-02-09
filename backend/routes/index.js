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
router.get('/', (req, res) => {
	res.render('/index')
});

// signin
router.post('/api/signup', async (req, res) => {
	const sql = `INSERT INTO userinfo(email, password, id) VALUE(?,?,?)`
	const resultJSON = {success: true}
	try {
		await execQuery(sql, [req.body.email, req.body.pw, req.body.id])
	} catch (error) {
		resultJSON.success = false		
	}
	res.json(resultJSON)
})


module.exports = router