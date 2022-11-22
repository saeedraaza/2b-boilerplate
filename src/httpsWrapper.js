const https = require("https");
const httpRetries = require("../config/config").getHTTPRetries();

function makeRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        for (let i = 1; i <= httpRetries; i++) {
            const req = https.request(options, (res) => {
                res.setEncoding('utf8');
                let responseBody = '';

                res.on('data', (chunk) => {
                    responseBody += chunk;
                });
                res.on('end', () => {
                    i = httpRetries + 1
                    resolve(JSON.parse(responseBody));
                });
            });

            req.on('error', (err) => {
                if(i === httpRetries) {
                    reject(err);
                }
            });
            if(data) req.write(data)
            req.end();
        }
    });
}

exports.makeRequest = makeRequest;