const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  user: 'cubikftp',
  password: 'LqWOGJB9PRmahmU',
  database: 'cubikftp',



});

module.exports = pool;
