require('dotenv').config()
const fs = require('fs')
const Zillow = require('node-zillow')
const zillow = new Zillow(process.env.ZILLOW_ID)

const parameters = {
    address: '2nd Avenue',
    citystatezip: 'Seattle, WA',
    rentzestimate: false
}

zillow.get('GetSearchResults', parameters)
    .then(results => {
        results = JSON.stringify(results.response, null, 2);

        fs.writeFile('test.txt', results, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    })





