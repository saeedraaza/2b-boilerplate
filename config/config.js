
const configVariables = {
    cryptoCompareHost : "min-api.cryptocompare.com",
    cryptoCompareAPIKey : "fd3ab06e033023056e8c4f3052ccc4eae213dc8f8da186d7d450cec7898069c2", // will not commit this in reality
    portfolioCurrency : "USD",
    httpRetries : 3
}

function getCryptoCompareHost() {
    return process.env.CRYPTO_COMPARE_HOST || configVariables.cryptoCompareHost
}

function getCryptoCompareAPIKey() {
    return process.env.CRYPTO_COMPARE_API_KEY || configVariables.cryptoCompareAPIKey;
}

function getPortfolioCurrency() {
    return process.env.PORTFOLIO_CURRENCY || configVariables.portfolioCurrency;
}

function getHTTPRetries() {
    return process.env.HTTP_RETRIES || configVariables.httpRetries;
}

exports.getCryptoCompareHost = getCryptoCompareHost
exports.getCryptoCompareAPIKey = getCryptoCompareAPIKey
exports.getPortfolioCurrency = getPortfolioCurrency
exports.getHTTPRetries = getHTTPRetries