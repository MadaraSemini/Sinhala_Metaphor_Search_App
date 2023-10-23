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

      const data = await csvtojson.fromFile(__dirname + '/../../data/corpus1.csv', 'utf8');
      const poems = JSON.parse(data);

      console.log('Data retrieved!');

      results = poems;

      console.log('Indexing data...');

      results.map(
        async (results) => (
          (poemObj = {
            poemName: results.poemName,
            poet: results.poet,
            year: results.year,
            source: results.source,
            line: results.line,
            metaphorPresent: results.metaphorPresent,
            countMetaphors: results.countMetaphors,
            metaphoricalTerms: results.metaphoricalTerms,
            targetDomain: results.targetDomain,
            sorceDomain: results.sorceDomain,
            meaning: results.meaning
            
          }),
          await client.index({
            index: 'poems',
            body: poemObj
          })
        )
      );

      if (poems.length) {
        indexData();
      } else {
        console.log('Data has been indexed successfully!');
      }
    } catch (err) {
      console.log(err);
    }

    console.log('Preparing for the next round of indexing...');
  };
  indexData();
});

module.exports = router;
