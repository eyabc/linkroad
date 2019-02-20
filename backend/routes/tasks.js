const express = require('express')
const execQuery = require('./db.js')
const router = require('express').Router()


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/put-task', async (req, res) => {
	const sql = `INSERT INTO tasks(title, url, id, cidx, parrent_task, level) VALUES(?,?,?,?,?,?)`

}
module.exports = router;
