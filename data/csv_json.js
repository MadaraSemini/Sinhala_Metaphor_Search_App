const csvtojson = require('csvtojson');
const fs = require('fs');

const csvFilePath = 'F:\ElasticSearch\Sinhala_Metaphor_Search_App\data\corpus.csv'; 
const jsonFilePath = 'F:\ElasticSearch\Sinhala_Metaphor_Search_App\data\data.json'; 

// Read the CSV file and convert it to JSON
csvtojson()
  .fromFile(csvFilePath)
  .then((jsonArrayObj) => {
    // Write the JSON data to a file
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArrayObj, null, 2), 'utf-8');
    console.log(`CSV file "${csvFilePath}" has been converted to JSON file "${jsonFilePath}".`);
  })
  .catch((err) => {
    console.error('An error occurred:', err);
  });
