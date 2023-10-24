const express = require('express');
const csvtojson = require('csvtojson');
const router = express.Router();
const axios = require('axios');
const client = require('../elasticsearch/client');
require('log-timestamp');
const fs = require('fs');


router.get('/poems', async function (req, res) {
  console.log('Loading Application...');
  res.json('Running Application...');

  indexData = async () => {
    try {
      console.log('Retrieving data');

      const results = await csvtojson().fromFile(__dirname + '/../../data/corpus1.csv');


      console.log('Data retrieved!');


      console.log("Indexing data...");

      for (const record of results) {
        await client.index({
          "index": "final_test",
          "body": record
        });
      }

      console.log("Data has been indexed successfully!");
    } catch (err) {
      console.log(err);
    }
  };
  indexData();
});

module.exports = router;
