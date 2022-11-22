const readLine = require('readline');
const fs = require('fs');
const https = require('https');

const OPERATIONS = {
    DEPOSIT : 'DEPOSIT',
    WITHDRAWAL : 'WITHDRAWAL'
}

function getLatestPortfolio () {
    const resultData = {}
    const lineReader = readLine.createInterface({
        input: fs.createReadStream('data/transactions.csv')
    });

    lineReader.on('line', function (line) {

        const columns = line.split(',');
        const row = {
            timeStamp : columns[0],
            transactionType : columns[1],
            token : columns[2],
            amount : parseFloat(columns[3]),
        };
        if(resultData[row.token]) {
            if(row.transactionType === OPERATIONS.DEPOSIT) {
                resultData[row.token].amount += row.amount
            } else if(row.transactionType === OPERATIONS.WITHDRAWAL) {
                resultData[row.token].amount -= row.amount
            }
        } else {
            if(row.transactionType === OPERATIONS.DEPOSIT) {
                resultData[row.token] = {
                    amount: row.amount
                }
            } else if(row.transactionType === OPERATIONS.WITHDRAWAL) {
                resultData[row.token] = {
                    amount: 0 - row.amount
                }
            }
        }
    });

    lineReader.on('close', async function () {
        for (const token of Object.keys(resultData)) {
            const options = {
                hostname: 'min-api.cryptocompare.com',
                port: 443,
                path: `/data/price?fsym=${token}&tsyms=USD`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : "fd3ab06e033023056e8c4f3052ccc4eae213dc8f8da186d7d450cec7898069c2"
                },
            };

            const res = await doRequest(options)
            resultData[token].amount = "USD "  + (resultData[token].amount * res['USD']).toFixed(4)

        }

        console.log("resultData")
        console.log(resultData)

    });
}

function doRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            res.setEncoding('utf8');
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(responseBody));
            });
        });

        req.on('error', (err) => {
            reject(err);
        });
        if(data) req.write(data)
        req.end();
    });
}

getLatestPortfolio();