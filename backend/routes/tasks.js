const express = require('express')
const execQuery = require('./db.js')
const router = require('express').Router()


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/put-task/:cidx', async (req, res) => {
	const parrent_task = 0
	const sql = `INSERT INTO task(title, url, id, cidx, parrent_task) VALUES(?,?,?,?,?)`
	const resultJSON = {success: true}
	console.log(req.session.member.id)
	console.log(req.params.cidx)
	try {
		await execQuery(sql, [req.body.title, req.body.url, req.session.member.id, req.params.cidx, parrent_task])
	} catch (error) {
		resultJSON.success = false
	}
	res.json(resultJSON)
})

router.get('/api/get-task/:cidx/:parrent_task', async (req, res) => {
	const sql = `SELECT * FROM task WHERE cidx=? and parrent_task=?`
	resultJSON = {success: true}
	try {
		resultJSON.taskInfo = await execQuery(sql, [req.params.cidx, req.params.parrent_task])
	} catch (error) {
		resultJSON.success = false
	}
	res.json(resultJSON)
})
module.exports = router;
