//in client/src/App.js
import axios from 'axios';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [chosenType, setChosenType] = useState('all');
  const [chosenQuery, setChosenQuery] = useState(null);
  const [chosenDateRange, setChosenDateRange] = useState('1970');
  const [documents, setDocuments] = useState(null);

  const sendSearchRequest = () => {
    var results;
    if(chosenType !== "all"){
       results = {
        method: 'GET',
        url: chosenQuery.startsWith('"') && chosenQuery.endsWith('"') ? 'http://localhost:3001/results-with-quotes' : 'http://localhost:3001/results',
        params: {
          type: chosenType,
          query: chosenQuery,
          dateRange: chosenDateRange,
        },
      };
    }else{
       results = {
        method: 'GET',
        url: chosenQuery.startsWith('"') && chosenQuery.endsWith('"') ? 'http://localhost:3001/results-all-with-quotes' : 'http://localhost:3001/results-all',
        params: {
          type: chosenType,
          query: chosenQuery,
          dateRange: chosenDateRange,
        },
      };
    }
   
    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='app'>
      <nav> 
        <ul className='nav-bar'>
          <li>කවුකිර</li>
        </ul>
      </nav> 
      <p className='directions'>
        {' '}
       Search for Sinhala Poems metophors.
      </p>
      <div className='main'>
        <div className='type-selector'>
          <ul>
            <li>
              <select
                className='select'
                name='types'
                id='types'
                value={chosenType}
                onChange={(e) => setChosenType(e.target.value)}
              >
                <option value='all' selected >All</option>
                <option value='yes'>With Metaphor</option>
                <option value='no'>Without Metaphor</option>
              </select>
            </li>
            <li>
              <form>
                <label>
                  <input
                    className='form'
                    type='text'
                    placeholder='Enter text to search'
                    value={chosenQuery}
                    onChange={(e) => setChosenQuery(e.target.value)}
                  />
                </label>
              </form>
            </li>
            <li>
              <select
                className='select'
                name='dateRange'
                id='dateRange'
                value={chosenDateRange}
                onChange={(e) => setChosenDateRange(e.target.value)}
              >
                <option value='2020'>Since 2020</option>
                <option value='2010'>Since 2010</option>
                <option value='2000'>Since 2000</option>
                <option value='1990'>Since 1990</option>
                <option value='1980'>Since 1980</option>
                <option value='1970' selected>Since 1970</option>
              </select>
            </li>
            <li>
              <button onClick={sendSearchRequest}>Search</button>
            </li>
          </ul>
        </div>
        {documents && (
          <div className='search-results'>
            {documents.length > 0 ? (
              <p> Number of results: {documents.length}</p>
            ) : (
              <p> No results found. Try broadening your search criteria.</p>
            )}
            {documents.map((document) => (
              <div className='results-card'>
                <div className='results-text'>
                  <p>Poem Name: {document._source.poemName}</p>
                  <p>Poet: {document._source.poet}</p>
                  <p>Source: {document._source.source}</p>
                  <p>Year: {document._source.year}</p>
                  <p>Line of the poem: {document._source.line}</p>
                  <p>Metaphor Count: {document._source.countMetaphors}</p>
                  <p>Metaphor term: {document._source.metaphoricalTerms}</p>
                  <p>Target Domain: {document._source.targetDomain}</p> 
                  <p>Source Domain: {document._source.sorceDomain}</p>
                  <p>Meaning: {document._source.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;