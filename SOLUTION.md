## Assumption
My understanding is that latest portfolio means one single value all after additions and subtractions for deposits and withdrawals 
respectively, and it has nothing to do with timestamp.

## Approach
* I have taken care of best practices and the code is scalable, maintainable and unbreakable. 
* The solution will not crash, I have handled the exceptions, and it will the errors in case of any failures.
* I have used retry logic for http requests and after failing, it logs an error to console.
* I have used tried to use nodejs internal modules as much as I could, such as `readline`, `fs` and `https`.
* I have used `.env` and `config` modules, and tried to avoid hard-coding as much as I could.

## Logic
* Calculating values of tokens by adding/subtracting in case of deposit/withdrawal after reading each line in `FileReader` module. 
I'll have the calculated values of all tokens by the end of file completion. We'll call it `transactionData`
* Passing both `transactionData` and the desired currency to `Portfolio` package to get the latest portfolio.
* `Portfolio` package loops over the tokens and gets crypto exchange rates of each token from `CryptoConverter` module.
* `CryptoConverter` module calls `HttpsWrapper` module to make https calls to `CryptoCompareAPI`.
* `HttpsWrapper` makes https requests using retry logic and sends back the response using promises. Response goes back to `CryptoConverter`, 
and from there goes back to `Portfolio` module.
* `Portfolio` module calculates the results by multiplying token amounts and currency rates, sends back the results to main module, 
which logs the results to the console.