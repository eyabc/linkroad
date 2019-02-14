const express = require('express')
const execQuery = require('./db.js')
const router = require('express').Router()


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.get('/api/class-list', async (req, res) => {
	const sql = `SELECT * FROM class WHERE id = ?`
	const resultJSON = {success: true}

	try {
		resultJSON.classList = await execQuery(sql, [req.session.member.id])
	} catch (error) {
		resultJSON.success = false
	}
	res.json(resultJSON)
})

router.get('/api/class-list/:cidx', async (req, res) => { 
	const cidx = req.params.cidx
	const sql = `SELECT * FROM class WHERE cidx = ? `
	const resultJSON = {success: true}

	try {
		resultJSON.classInfo = (await execQuery(sql, [cidx]))[0]
	} catch (error) {
		resultJSON.success = false
	}
	res.json(resultJSON)
})

router.post('/api/put-class', async(req,res)=>{
	const sql =`INSERT INTO class(id, title, description) VALUES(?,?,?)`
	let resultJSON = { success: true}
	try {
		await execQuery(sql, [req.session.member.id,req.body.title, req.body.description])
	} catch (error) {
		resultJSON.success = false
	}
	res.json(resultJSON)
})