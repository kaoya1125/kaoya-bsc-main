import * as tokenIcons from './tokenIcons';

export const contractAddresses = {
  sushi: {
    42: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2', // aelf sushi new one 9.9
    1: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2', // aelf sashimi
    97: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2', // aelf sashimi bsc testnet
    56: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2', // aelf sashimi bsc mainnet
  },
  // useless in heco & bsc
  sashimiBar: {
    42: '0xfaC2681cB05Ba08De504e7FDBc2186B22d868f2A', // aelf sushi new one 9.18
    1: '0x6ed306DbA10E6c6B20BBa693892Fac21f3B91977', // aelf sashimi
    97: '0x6ed306DbA10E6c6B20BBa693892Fac21f3B91977', // aelf sashimi
    56: '0x6ed306DbA10E6c6B20BBa693892Fac21f3B91977', // aelf sashimi
  },
  sashimiRouter: {
    42: '0x24cEFA86fC1826FD31b4cb911034907735F8085A',
    1: '0x24cEFA86fC1826FD31b4cb911034907735F8085A',
    97: '0x24cEFA86fC1826FD31b4cb911034907735F8085A',
    56: '0x24cEFA86fC1826FD31b4cb911034907735F8085A',
  },
  bnbStaking: {
    42: '0xfe2a5E66FC37A24c6e76C3eE8687fC05bd1D454D',
    1: '0xfe2a5E66FC37A24c6e76C3eE8687fC05bd1D454D',
    97: '0xfe2a5E66FC37A24c6e76C3eE8687fC05bd1D454D',
    56: '0xfe2a5E66FC37A24c6e76C3eE8687fC05bd1D454D',
  },
  busdStaking: {
    42: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
    1: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
    97: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
    56: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
  },
  // useless in heco & bsc
  investment: {
    42: '0xF36e3d28E8B632E9b2ae26663bf6d85D239bDc58',
    1: '0xF36e3d28E8B632E9b2ae26663bf6d85D239bDc58',
    97: '0xF36e3d28E8B632E9b2ae26663bf6d85D239bDc58',
    56: '0xF36e3d28E8B632E9b2ae26663bf6d85D239bDc58',
  },
  masterChef: {
    42: '0x34E483600e9c73390C7fBB4C9985a057156a611F', // aelf sushi new one 9.9
    1: '0x34E483600e9c73390C7fBB4C9985a057156a611F', // aelf master
    97: '0x34E483600e9c73390C7fBB4C9985a057156a611F', // aelf master
    56: '0x34E483600e9c73390C7fBB4C9985a057156a611F', // aelf master
  },
  // WHT for heco, WBNB for bsc
  weth: {
    42: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // aelf sushi
    1: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // sushi use
    97: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // sushi use
    56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // sushi use
  },
}

export const sashimiAddress = '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2';
export const wethAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
export const wethSashimiLpPAddress = '0x02501e0471061345AdF1d0Bcf7A6B9aD4738D5C8'; // BNB-SASHIMI
export const supportedLendingInvestmentPools = [
  {
    lpAddress: '0x02501e0471061345AdF1d0Bcf7A6B9aD4738D5C8', // BNB-Sashimi
    providerAddress: '0xed58263110C26ebe12ddA91845A9905A56C48125', // BNB vault provider
    depositAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'BNB',
    tokenSymbol: 'BNB',
    icon: tokenIcons.bnb,
  },
  {
    lpAddress: '0xbB9d97d2427C8B7296D7CCE9C99DEdFa98b9c61D', // ETH-USDT
    providerAddress: '0x1e6F993246c9271150a6fD584dE3100c3b3CF1CA', // ETH vault provider
    depositAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    converterOptions: {
      lpAddresses: [
        '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B'
      ],
      pivotTokenAddresses: [
        '0x55d398326f99059fF775485246999027B3197955'
      ]
    },
    depositTokenDecimal: 18,
    depositTokenSymbol: 'ETH',
    tokenSymbol: 'ETH',
    icon: tokenIcons.eth,
  },
  {
    lpAddress: '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B', // USDT-WBNB
    providerAddress: '0x52b3B4bf9BF4cc752D21648288b3c1242b5DA6ce', // USDT vault provider
    depositAddress: '0x55d398326f99059fF775485246999027B3197955',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'USDT',
    tokenSymbol: 'USDT',
    icon: tokenIcons.usdt,
  },
  {
    lpAddress: '0x42aBEDDDc74d860f050CeA1ee40c3d53f284C246', // BTCB-USDT
    providerAddress: '0xD84aD5fEa603B9cE81F111546B96D09906ea7d10', // BTCB vault provider
    depositAddress: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    converterOptions: {
      lpAddresses: [
        '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B'
      ],
      pivotTokenAddresses: [
        '0x55d398326f99059fF775485246999027B3197955'
      ]
    },
    depositTokenDecimal: 18,
    depositTokenSymbol: 'BTCB',
    tokenSymbol: 'BTCB',
    icon: tokenIcons.btcb,
  },
];

export const supportedInvestmentPools = [];
// These pools get 0 point; [type pid]
export const unStakeOnlyPools = [];
// If is xxx-Sashimi Pool; [type pid]
// Support sashimi pair only. Used in FarmCards.tsx
export const notETHPairPools = [];

export const hiddenPools = [];

export const doublePools = [];
export const unStakeOnlyDoublePools = [];

const getWaitingPools = (start, end) => {
  const array = [];
  for (let i = 0; i <= end - start; i++) {
    array.push(start + i);
  }
  return array;
};
export const waitingInfo = {
  waitingPool: getWaitingPools(0, 6),
  startTime: 1614592800519
};

// 0928 Normal Farm -> SASHIMI LP
export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      42: '0x02501e0471061345AdF1d0Bcf7A6B9aD4738D5C8',
      1: '0x02501e0471061345AdF1d0Bcf7A6B9aD4738D5C8',
      97: '0x02501e0471061345AdF1d0Bcf7A6B9aD4738D5C8',
      56: '0x02501e0471061345AdF1d0Bcf7A6B9aD4738D5C8',
    },
    tokenAddresses: {
      42: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
      1: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
      97: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2', // sashimi
      56: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
    },
    name: 'Sashimi Party!',
    symbol: 'BNB-SASHIMI SALP',
    tokenSymbol: 'SASHIMI',
    icon: '🍣',
  },
  {
    pid: 1,
    lpAddresses: {
      42: '0xA9c03F057b92622CAC0B3cE0Cdf39A4b95202be3',
      1: '0xA9c03F057b92622CAC0B3cE0Cdf39A4b95202be3',
      97: '0xA9c03F057b92622CAC0B3cE0Cdf39A4b95202be3',
      56: '0xA9c03F057b92622CAC0B3cE0Cdf39A4b95202be3',
    },
    tokenAddresses: {
      42: '0x55d398326f99059fF775485246999027B3197955',
      1: '0x55d398326f99059fF775485246999027B3197955', // USDT
      97: '0x55d398326f99059fF775485246999027B3197955',
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
    // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
    // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
    uniV2Pivot: true,
    uniV2LPAddress: '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B', // USDT-BNB
    sashimiPlateInfo: {
      mainTokenIndex: 0, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },
    name: 'USDT-Sashimi',
    symbol: 'USDT-Sashimi SALP',
    tokenSymbol: 'SASHIMI',
    icon: '🍻',
  },
  // {
  //   pid: 1,
  //   lpAddresses: {
  //     42: '0xA9c03F057b92622CAC0B3cE0Cdf39A4b95202be3',
  //     1: '0xA9c03F057b92622CAC0B3cE0Cdf39A4b95202be3',
  //     97: '0xA9c03F057b92622CAC0B3cE0Cdf39A4b95202be3',
  //     56: '0xA9c03F057b92622CAC0B3cE0Cdf39A4b95202be3',
  //   },
  //   tokenAddresses: {
  //     42: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //     1: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //     97: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2', // Sashimi
  //     56: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //   },
  //   name: 'USDT-Sashimi',
  //   symbol: 'USDT-Sashimi SALP',
  //   tokenSymbol: 'USDT',
  //   icon: '🍻',
  // },
  {
    pid: 2,
    lpAddresses: {
      42: '0x55821F0bc419aBEA6A83bFc30D0340aF3ebd2e47',
      1: '0x55821F0bc419aBEA6A83bFc30D0340aF3ebd2e47',
      97: '0x55821F0bc419aBEA6A83bFc30D0340aF3ebd2e47',
      56: '0x55821F0bc419aBEA6A83bFc30D0340aF3ebd2e47',
    },
    tokenAddresses: {
      42: '0x55d398326f99059fF775485246999027B3197955',
      1: '0x55d398326f99059fF775485246999027B3197955', // USDT
      97: '0x55d398326f99059fF775485246999027B3197955',
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
    // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
    // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
    uniV2Pivot: true,
    uniV2LPAddress: '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B', // USDT-BNB
    sashimiPlateInfo: {
      mainTokenIndex: 0, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },
    name: 'USDT-ELF',
    symbol: 'USDT-ELF SALP',
    tokenSymbol: 'USDT',
    icon: '🍌',
  },
  {
    pid: 3,
    lpAddresses: {
      42: '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B',
      1: '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B',
      97: '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B',
      56: '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B',
    },
    tokenAddresses: {
      42: '0x55d398326f99059fF775485246999027B3197955',
      1: '0x55d398326f99059fF775485246999027B3197955',
      97: '0x55d398326f99059fF775485246999027B3197955', // USDT
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
    name: 'USDT Turtle',
    symbol: 'USDT-BNB SALP',
    tokenSymbol: 'USDT-BNB',
    icon: '🐢',
  },
  {
    pid: 4,
    lpAddresses: {
      42: '0x42aBEDDDc74d860f050CeA1ee40c3d53f284C246',
      1: '0x42aBEDDDc74d860f050CeA1ee40c3d53f284C246',
      97: '0x42aBEDDDc74d860f050CeA1ee40c3d53f284C246',
      56: '0x42aBEDDDc74d860f050CeA1ee40c3d53f284C246',
    },
    tokenAddresses: {
      42: '0x55d398326f99059fF775485246999027B3197955',
      1: '0x55d398326f99059fF775485246999027B3197955', // USDT
      97: '0x55d398326f99059fF775485246999027B3197955',
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
    // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
    // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
    uniV2Pivot: true,
    uniV2LPAddress: '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B', // USDT-BNB
    sashimiPlateInfo: {
      mainTokenIndex: 0, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },
    name: 'BTCB-USDT',
    symbol: 'BTCB-USDT SALP',
    tokenSymbol: 'BTCB',
    icon: '🐌',
  },
  {
    pid: 5,
    lpAddresses: {
      42: '0xbB9d97d2427C8B7296D7CCE9C99DEdFa98b9c61D',
      1: '0xbB9d97d2427C8B7296D7CCE9C99DEdFa98b9c61D',
      97: '0xbB9d97d2427C8B7296D7CCE9C99DEdFa98b9c61D',
      56: '0xbB9d97d2427C8B7296D7CCE9C99DEdFa98b9c61D',
    },
    tokenAddresses: {
      42: '0x55d398326f99059fF775485246999027B3197955',
      1: '0x55d398326f99059fF775485246999027B3197955', // USDT
      97: '0x55d398326f99059fF775485246999027B3197955',
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
    // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
    // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
    uniV2Pivot: true,
    uniV2LPAddress: '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B', // USDT-BNB
    sashimiPlateInfo: {
      mainTokenIndex: 0, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },
    name: 'ETH-USDT',
    symbol: 'ETH-USDT SALP',
    tokenSymbol: 'ETH',
    icon: '🍷',
  },
  {
    pid: 6,
    lpAddresses: {
      42: '0xD55d2ee90F587c22f66a6a57E0552c3D5365f7C7',
      1: '0xD55d2ee90F587c22f66a6a57E0552c3D5365f7C7',
      97: '0xD55d2ee90F587c22f66a6a57E0552c3D5365f7C7',
      56: '0xD55d2ee90F587c22f66a6a57E0552c3D5365f7C7',
    },
    tokenAddresses: {
      42: '0x55d398326f99059fF775485246999027B3197955',
      1: '0x55d398326f99059fF775485246999027B3197955', // USDT
      97: '0x55d398326f99059fF775485246999027B3197955',
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
    // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
    // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
    uniV2Pivot: true,
    uniV2LPAddress: '0x0c3675E1ddE92f708E1C67f5C7A86451b4b0531B', // USDT-BNB
    sashimiPlateInfo: {
      mainTokenIndex: 0, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },
    name: 'DOT-USDT',
    symbol: 'DOT-USDT SALP',
    tokenSymbol: 'DOT',
    icon: '🍥',
  },
];

// Vault
// TODO: replace
export const vaultController = '0x3884eab512bB0475100997271EC83163DAa944AE';
export const vaults = [];

export const vaultStableTokenPriceAPI = 'http://39.98.34.153:8081/api/price';
