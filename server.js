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

app.get("/hotels", function (req, res) {
  const hotelNameQuery = req.query.name;
  let query = `SELECT * FROM hotels ORDER BY name`;
  console.log(req.query)
  if (hotelNameQuery) {
    query = `SELECT * FROM hotels WHERE name LIKE '%${hotelNameQuery}%' ORDER BY name`;
  }

  pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.get("/hotels/:hotelId", function (req, res) {
  const hotelId = req.params.hotelId;

  pool
    .query("SELECT * FROM hotels WHERE id=$1", [hotelId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.listen(3001, function() {
  console.log("server is listening on 3001");
});
