const express = require("express");
const app = express();

const { Pool } = require('pg');

const pool = new Pool({
    user: 'sam',
    host: 'localhost',
    database: 'cyf_hotels',
    password: 'password',
    port: 5432
});

app.get("/hotels", function(req, res) {
  pool.query('SELECT * FROM hotels', (error, result) => {
    res.json(result.rows);
  });
});

app.listen(3001, function() {
  console.log("server is listening on 3001");
});
