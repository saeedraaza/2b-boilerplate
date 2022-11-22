const fileReader = require("./src/fileReader");
const portfolio = require("./src/portfolio");
const config = require("./config/config");

require('dotenv').config();

function run() {
    fileReader.getTransactionsData().then(transactionsData => {
        portfolio.getLatest(transactionsData, config.getPortfolioCurrency()).then(result => {
            console.log(result)
        }).catch(err => {
            console.error("Error: " + err)
        })
    }).catch(err => {
        console.error("Error: " + err)
    })
}

run();