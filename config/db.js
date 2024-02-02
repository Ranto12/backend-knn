const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'knn'
});

connection.connect((_err) => {
    if(_err) {
        console.error('error connection database: ', _err)
        return;
    }
    console.log ('connect to database')
});

module.exports = connection;