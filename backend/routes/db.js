const db = require('mysql')
const connData = {
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'stackQueue'
}
const exec = (sql, arr) => new Promise((resolve, reject) => {
	const conn = db.createConnection(connData)
	conn.query(sql, arr, (err, rows)=>{
		err? reject(err) : resolve(rows)
		conn.end()
	})
})

module.exports = exec