const readLine = require("readline");
const fs = require("fs");

const OPERATIONS = {
    DEPOSIT : 'DEPOSIT',
    WITHDRAWAL : 'WITHDRAWAL'
}

function getTransactionsData() {
    const resultData = {}
    return new Promise((resolve, reject) => {
        try {
            const readStream = fs.createReadStream('data/transactions.csv');
            readStream.on('error', function (err) {
                reject(err)
            });
            const lineReader = readLine.createInterface({
                input: readStream
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

            lineReader.on('close', function () {
                resolve(resultData);
            });

            lineReader.on('SIGTSTP', function (err) {
                reject(err);
            });
        } catch (e) {
            reject(e)
        }
    });
}

exports.getTransactionsData = getTransactionsData;