const mysql = require("mysql");


// create mysql connection
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'visa_reservation',
    charset : 'utf8'
});

// create connnection
mysqlConnection.connect((err) => {
    if(!err)
        console.log("db connection succeded")
    else
        // use undefined and 2 in the stringify params to prettify the error log
        throw(`db connection failed ${JSON.stringify(err, undefined, 2)}`)
});

module.exports = mysqlConnection;