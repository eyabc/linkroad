const express = require('express')
const execQuery = require('./db.js')
const router = require('express').Router()


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/put-task/:cidx', async (req, res) => {
	let parent_task
	if (req.body.parent_task == null ){
		parent_task = 0
	} else {
		parent_task = req.body.parent_task
	}
	const sql = `INSERT INTO task(title, url, id, cidx, parent_task) VALUES(?,?,?,?,?)`
	const resultJSON = {success: true}
	try {
		const res = await execQuery(sql, [req.body.title, req.body.url, req.session.member.id, req.params.cidx, parent_task])
		resultJSON.tidx = res.insertId
		console.log(res)
	} catch (error) {
		resultJSON.success = false
	}
	res.json(resultJSON)
})

router.get('/api/get-task/:cidx/:parent_task', async (req, res) => {
	const sql = `SELECT * FROM task WHERE cidx=? and parent_task=?`
	resultJSON = {success: true}
	try {
		resultJSON.taskInfo = await execQuery(sql, [req.params.cidx, req.params.parent_task])
	} catch (error) {
		resultJSON.success = false
	}
	res.json(resultJSON)
})

router.put('/api/task', async(req, res) => {
	const sql = `UPDATE task SET title = ?, url = ?, description=? WHERE tidx= ?`
	resultJSON = {success: true}
	try {
		await execQuery(sql, [req.body.title, req.body.url, req.body.description, req.body.tidx])
	} catch (error) {
		resultJSON.success = false
	}
	res.json(resultJSON)
})

router.delete('/api/task', async(req,res) => {
	const idxs = req.body.idxs.toLocaleString()
	const sql = `DELETE FROM task WHERE tidx in (${req.body.tidx})`
	try { await execQuery(sql, [req.body.tidx])}
	catch (error) {resultJSON.success = false}
	res.json(resultJSON)
})

module.exports = router;
