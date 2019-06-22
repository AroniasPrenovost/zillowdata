require('dotenv').config();
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;
const Zillow = require('node-zillow');
const zillow = new Zillow(process.env.ZILLOW_ID)

const parameters = {
    address: '2nd Avenue',
    citystatezip: 'Seattle, WA',
    rentzestimate: false
}

zillow.get('GetSearchResults', parameters)
    .then(results => {

        results = JSON.stringify(results.response.results.result, null, 2);
        writeFile('test.json', results, (err) => {
            if (err) throw err;
        });

        // convert to csv
        readFile('test.json', 'utf-8', (err, fileContent) => {
            if (err) {
                console.log(err);
                throw new Error(err);
            }
            const csvData = csvjson.toCSV(fileContent, {
                headers: 'key'
            });
            writeFile('test-data.csv', csvData, (err) => {
                if (err) {
                    console.log(err);
                    throw new Error(err);
                }
                console.log('Success');
            });
        });
    });






