const express = require("express");
const { Client } = require("@elastic/elasticsearch");
const client = require("./elasticsearch/client");
const cors = require("cors");

const app = express();

const port = 3001;
const data = require("./dataManage/insert_data");

app.use("/ingest_data", data);
app.use(cors());

app.get("/results", (req, res) => {
  const passedType = req.query.type;
  const passedQuery = req.query.query;
  const passedDateRange = req.query.dateRange;

  console.log(req.query);

  async function sendESRequest() {
    const body = await client.search({
      index: "poems",
      body: {
        size: 300,

        query: {
          bool: {
            must: [
              {
                bool: {
                  should: [
                    {
                      match: {
                        poemName: passedQuery,
                      },
                    },
                    {
                      match: {
                        poet: passedQuery,
                      },
                    },
                    {
                      match: {
                        line: passedQuery,
                      },
                    },
                    {
                      match: {
                        source: passedQuery,
                      },
                    },
                  ],
                },
              },
              {
                term: {
                  metaphorPresent: {
                    value: passedType,
                  },
                },
              },
              {
                range: {
                  year: {
                    gte: passedDateRange,
                  },
                },
              },
            ],
          },
        },
        sort: [
          {
            countMetaphors: {
              order: "desc"
            },
          },
        ],
      },
    });
    res.json(body.hits.hits);
  }
  sendESRequest();
});

app.get("/results-all", (req, res) => {
  const passedType = req.query.type;
  const passedQuery = req.query.query;
  const passedDateRange = req.query.dateRange;

  console.log(req.query);

  async function sendESRequest() {
    const body = await client.search({
      index: "poemsz",
      body: {
        size: 300,

        query: {
          bool: {
            must: [
              {
                bool: {
                  should: [
                    {
                      match: {
                        poemName: passedQuery,
                      },
                    },
                    {
                      match: {
                        poet: passedQuery,
                      },
                    },
                    {
                      match: {
                        line: passedQuery,
                      },
                    },
                    {
                      match: {
                        source: passedQuery,
                      },
                    },
                  ],
                },
              },
              {
                range: {
                  year: {
                    gte: passedDateRange,
                  },
                },
              },
            ],
          },
        },
        sort: [
            {
              countMetaphors: {
                order: "desc"
              },
            },
          ],
      },
    });
    res.json(body.hits.hits);
  }
  sendESRequest();
});

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
