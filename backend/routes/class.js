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