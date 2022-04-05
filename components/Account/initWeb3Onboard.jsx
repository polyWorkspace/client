import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
// import ledgerModule from '@web3-onboard/ledger';
import walletConnectModule from '@web3-onboard/walletconnect';
import walletLinkModule from '@web3-onboard/walletlink';

const injected = injectedModule();
const walletLink = walletLinkModule();
const walletConnect = walletConnectModule();

// const ledger = ledgerModule();
//console.log('process.env.REACT_APP_TOKEN_SYMBOL', process.env.REACT_APP_TOKEN_SYMBOL);
const MAINNET_RPC_URL = process.env.REACT_APP_INFURA;

//console.log('---MAINNET_RPC_URL----', MAINNET_RPC_URL);

const initWeb3Onboard = init({
    wallets: [injected, walletLink, walletConnect],
    chains: [
        {
            id: '0x1',
            token: 'ETH',
            label: 'Ethereum Mainnet',
            rpcUrl: 'https://mainnet.infura.io/v3/c1afc7d8cba84464be14fcb3f93b2ef',
        },
        {
            id: '0x3',
            token: 'tROP',
            label: 'Ethereum Ropsten Testnet',
            rpcUrl: 'https://ropsten.infura.io/v3/c1afc7d8cba84464be14fcb3f93b2ef7',
        },
        {
            id: '0x4',
            token: 'rETH',
            label: 'Ethereum Rinkeby Testnet',
            rpcUrl: 'https://rinkeby.infura.io/v3/c1afc7d8cba84464be14fcb3f93b2ef7',
        },
        {
            id: '0x89',
            token: 'MATIC',
            label: 'Matic Mainnet',
            rpcUrl: 'https://matic-mainnet.chainstacklabs.com',
        },
    ],
    appMetadata: {
        name: 'Blocknative Web3-Onboard',
        icon: '/Logo.png',
        logo: '/Logo.png',
        description: 'Demo app for Web3-Onboard',
        recommendedInjectedWallets: [
            // { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
            { name: 'MetaMask', url: 'https://metamask.io' },
        ],
    },
});

export default initWeb3Onboard;
