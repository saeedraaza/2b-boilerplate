const httpsWrapper = require("./httpsWrapper");
const config = require("../config/config");

function convert(token, currency){
    const options = {
        hostname: config.getCryptoCompareHost(),
        port: 443,
        path: `/data/price?fsym=${token}&tsyms=${currency}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : config.getCryptoCompareAPIKey()
        },
    };
    return httpsWrapper.makeRequest(options)
}

exports.convert = convert;