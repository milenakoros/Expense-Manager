const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '',       // Zamień puste pola na swoje dane
    port: '',
    user: '',
    password: '', 
    database: '',   
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
