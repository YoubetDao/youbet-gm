
import {
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';

import {
    mainnet,
    lineaSepolia,
} from 'wagmi/chains';


export const config = getDefaultConfig({
    appName: 'kuibu',
    projectId: '05c3ea68819376e65dc4a8802f90f41b',
    chains: [mainnet, lineaSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

import { SDK, NetworkType } from 'youbet-sdk';

export const sdk = new SDK({
    networkType: NetworkType.Testnet // or NetworkType.Testnet
});

export const TITLE = "Good Morning1"