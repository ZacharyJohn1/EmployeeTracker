const mysql = require("mysql2");


const trackerRoute = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Sandys2356',
      database: 'tracker_db'
    },
    console.log(`Connected to the tracker database.`)
  );
  
module.exports = trackerRoute;