const ChainId = {
  ganache: 5777,
  goerli: 5,
  hardhat: 7545,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  bscTestnet: 97,
  bscMainnet: 56,
  MaticTestnet: 80001,
  MaticMainnet: 137,
  ropsten: 3
};
//This is a example for 1inche.exchange API end points
//return objects
export const quote = () => fetch("https://api.1inch.exchange/v1.1/quote?fromTokenSymbol=ETH&toTokenSymbol=DAI&amount=100000000000000000000&disabledExchangesList=Bancor")
.then(function(res)
    {return res.json()})
.then(function(data)
    {console.log(data)}) 

//return objects
export const swap = () => fetch("https://api.1inch.exchange/v1.1/swap?fromTokenSymbol=ETH&toTokenSymbol=DAI&amount=10000000000000000000000000&fromAddress=0xE8C902e5A810c2368c6eFefcb23B52Efc280aFe0&slippage=1&disableEstimate=true")
.then(function(res)
    {return res.json()})
.then(function(data)
    {console.log(data)}) 

//return objects        
export const swapQuote = () => await fetch("https://api.1inch.exchange/v1.1/swapQuote?fromTokenSymbol=ETH&toTokenSymbol=DAI&amount=10000000000000000000000000&fromAddress=0xE8C902e5A810c2368c6eFefcb23B52Efc280aFe0&slippage=1&disableEstimate=true")
.then(function(res)
    {return res.json()})
.then(function(data)
    {console.log(data)})

//return an array        
export const tokens = () =>  await fetch("https://api.1inch.exchange/v1.1/tokens")
.then(function(res)
     {return res.json()})
.then(function(data)
     {console.log(data)})

//return an array         
export const exchanges = () =>   fetch("https://api.1inch.exchange/v1.1/exchanges")
.then(function(res)
      {return res.json()})
.then(function(data)
      {console.log(data)})