const cryptoConverter = require("./cryptoConverter");

async function getLatest(transactionsData, currency) {
    let latestPortfolio = {}
    for (const token of Object.keys(transactionsData)) {
        const res = await cryptoConverter.convert(token, currency)
        if (res['Response'] === 'Error') {
            console.error(`Portfolio cannot be calculated for token ${token} and currency ${currency}`)
            console.error(res['Message'])
        } else {
            latestPortfolio[token] = `${currency} ${(transactionsData[token].amount * res[currency]).toFixed(2)}`
        }
    }
    return latestPortfolio;
}

exports.getLatest = getLatest;