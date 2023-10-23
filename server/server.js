const express = require('express');
const client = require('./elasticsearch/client');

const app = express();

const port = 3001;
const data = require('./dataManage/insert_data');

app.use('/ingest_data', data);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));