// import
const express = require('express')
const execQuery = require('./db.js')
const router = require('express').Router()

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

// login
router.post('/api/login', async (req, res) => {
	const sql = `SELECT * FROM userinfo WHERE id= ? and password = ?`
	let member
	let resultJSON = {success: true}
	try {
		member = await execQuery(sql, [req.body.id, req.body.pw])
		req.session.member = resultJSON['member']  = member[0]
		if(!member.length){
			resultJSON.success = false
		}
	} catch (errer) {
		resultJSON.success = false
	}
	res.json(resultJSON)
})
router.get('/api/login', async (req, res) => {
	const member = req.session.member
	const resultJSON = { success : true }
	console.log("node")
	if(member) {
		resultJSON.success = true
		resultJSON.member = {
			id: member.id,
			email: member.email
		}
	}
	res.json(resultJSON)
})

module.exports = router