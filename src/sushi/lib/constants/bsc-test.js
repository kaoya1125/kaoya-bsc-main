export const contractAddresses = {
  sushi: {//kaoya token
    42: '0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4', // aelf sushi new one 9.9
    1: '0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4', // aelf sashimi
    97: '0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4', // aelf sashimi bsc testnet
    56: '0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4', // aelf sashimi bsc mainnet
  },
  // useless in heco & bsc
  sashimiBar: {
    42: '0xfaC2681cB05Ba08De504e7FDBc2186B22d868f2A', // aelf sushi new one 9.18
    1: '0x6ed306DbA10E6c6B20BBa693892Fac21f3B91977', // aelf sashimi
    97: '0x6ed306DbA10E6c6B20BBa693892Fac21f3B91977', // aelf sashimi
    56: '0x6ed306DbA10E6c6B20BBa693892Fac21f3B91977', // aelf sashimi
  },
  sashimiRouter: {
    42: '0x8AD0c3155dE2beE0d6c55E93d4F8bcE808696a4F',
    1: '0x8AD0c3155dE2beE0d6c55E93d4F8bcE808696a4F',
    97: '0x8AD0c3155dE2beE0d6c55E93d4F8bcE808696a4F',
    56: '0x8AD0c3155dE2beE0d6c55E93d4F8bcE808696a4F',
  },
  bnbStaking: {
    42: '0x49FC6E18338680C660c750ED54b355c214421f3A',
    1: '0x49FC6E18338680C660c750ED54b355c214421f3A',
    97: '0x49FC6E18338680C660c750ED54b355c214421f3A',
    56: '0x49FC6E18338680C660c750ED54b355c214421f3A',
  },
  busdStaking: {
    42: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
    1: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
    97: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
    56: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
  },
  bnbAirdrop: {
    42: '0xd2C69124dada43E6FeaDbbb3b0B4eD46D33fbAf3',
    1: '0xd2C69124dada43E6FeaDbbb3b0B4eD46D33fbAf3',
    97: '0xd2C69124dada43E6FeaDbbb3b0B4eD46D33fbAf3',
    56: '0xd2C69124dada43E6FeaDbbb3b0B4eD46D33fbAf3',
  },
  busdAirdrop: {
    42: '0x078cCC7e308C46b3d218D37928DCEBDd4b4293B4',
    1: '0x078cCC7e308C46b3d218D37928DCEBDd4b4293B4',
    97: '0x078cCC7e308C46b3d218D37928DCEBDd4b4293B4',
    56: '0x078cCC7e308C46b3d218D37928DCEBDd4b4293B4',
  },
  // useless in heco & bsc
  investment: {
    42: '0x3F966FA1c0606e19047ed72068D2857677E07EF4',
    1: '0x3F966FA1c0606e19047ed72068D2857677E07EF4',
    97: '0x3F966FA1c0606e19047ed72068D2857677E07EF4',
    56: '0x3F966FA1c0606e19047ed72068D2857677E07EF4',
  },
  masterChef: {
    42: '0x91D4dE596f669B253282A80F7c9d3D876E4a3977', // aelf sushi new one 9.9
    1: '0x91D4dE596f669B253282A80F7c9d3D876E4a3977', // aelf master
    97: '0x91D4dE596f669B253282A80F7c9d3D876E4a3977', // aelf master
    56: '0x91D4dE596f669B253282A80F7c9d3D876E4a3977', // aelf master
  },
  // WHT for heco, WBNB for bsc
  weth: {
    42: '0xd7ae40e5ef906cad1633bdbfe47cce04c4fcf28b', // aelf sushi
    1: '0xd7ae40e5ef906cad1633bdbfe47cce04c4fcf28b', // sushi use
    97: '0xd7ae40e5ef906cad1633bdbfe47cce04c4fcf28b', // sushi use
    56: '0xd7ae40e5ef906cad1633bdbfe47cce04c4fcf28b', // sushi use
  },
}

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
  waitingPool: getWaitingPools(10, 10),
  startTime: 1619232713763
};

// 0928 Normal Farm -> KAOYA LP
export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      42: '0xE7B7410EF661eBb2Eb54AFBDb433Dffbf1476335',
      1: '0xE7B7410EF661eBb2Eb54AFBDb433Dffbf1476335',
      97: '0xE7B7410EF661eBb2Eb54AFBDb433Dffbf1476335',
      56: '0xE7B7410EF661eBb2Eb54AFBDb433Dffbf1476335',
    },
    tokenAddresses: {
      42: '0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4',
      1: '0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4',
      97: '0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4', // sashimi
      56: '0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4',
    },
    name: 'Kaoya Party!',
    symbol: 'KAOYA-BNB KALP LP',
    tokenSymbol: 'KY',
    icon: '🍣',
  },
  {
    pid: 1,
    lpAddresses: {
      42: '0xE034e2f27b22e6F94b4ad98079c89180A3f2BeE1',
      1: '0xE034e2f27b22e6F94b4ad98079c89180A3f2BeE1',
      97: '0xE034e2f27b22e6F94b4ad98079c89180A3f2BeE1',
      56: '0xE034e2f27b22e6F94b4ad98079c89180A3f2BeE1',
    },
    tokenAddresses: {
      42: '0xDc25d2F8eC9C2e351C996c2a9852178e722ef441',
      1: '0xDc25d2F8eC9C2e351C996c2a9852178e722ef441',
      97: '0xDc25d2F8eC9C2e351C996c2a9852178e722ef441', // ETH
      56: '0xDc25d2F8eC9C2e351C996c2a9852178e722ef441',
    },
    name: 'BUSD-KAOYA',
    symbol: 'BUSD-KAOYA KALP LP',
    tokenSymbol: 'KY',
    icon: '🍎',
  },
  {
    pid: 2,
    lpAddresses: {
      42: '0x93A21a8Ec2A309B2873345294C7f4eAE95169a91',
      1: '0x93A21a8Ec2A309B2873345294C7f4eAE95169a91',
      97: '0x93A21a8Ec2A309B2873345294C7f4eAE95169a91',
      56: '0x93A21a8Ec2A309B2873345294C7f4eAE95169a91',
    },
    tokenAddresses: {
      42: '0xd7ae40e5ef906cad1633bdbfe47cce04c4fcf28b',
      1: '0xd7ae40e5ef906cad1633bdbfe47cce04c4fcf28b',
      97: '0xd7ae40e5ef906cad1633bdbfe47cce04c4fcf28b', // ETH
      56: '0xd7ae40e5ef906cad1633bdbfe47cce04c4fcf28b',
    },
    name: 'WBNB-BUSD',
    symbol: 'WBNB-BUSD KALP LP',
    tokenSymbol: 'BNB',
    icon: '🍌',
  },
  // {
  //   pid: 2,
  //   lpAddresses: {
  //     42: '0xFb4699d95A7139BaB33315825771C6E4347F48E1',
  //     1: '0xFb4699d95A7139BaB33315825771C6E4347F48E1',
  //     97: '0xFb4699d95A7139BaB33315825771C6E4347F48E1',
  //     56: '0xFb4699d95A7139BaB33315825771C6E4347F48E1',
  //   },
  //   tokenAddresses: {
  //     42: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //     1: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2', // ETH
  //     97: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //     56: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //   },
  //   // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
  //   // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
  //   uniV2Pivot: true,
  //   uniV2LPAddress: '0x4dbCb8BC649d9ef27Aa00daE17d13C9bE8dC8416', // ETH-BNB
  //   sashimiPlateInfo: {
  //     mainTokenIndex: 0, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
  //     tokensDecimal: [18, 18],
  //     type: 10, // for normal pool
  //   },
  //   name: 'USDT—ETH',
  //   symbol: 'USDT—ETH SALP LP',
  //   tokenSymbol: 'USDT',
  //   icon: '🍌',
  // },
  // {
  //   pid: 2,
  //   lpAddresses: {
  //     42: '0x4678E85e3773AB142cC46afC8D57B078792eBf74',
  //     1: '0x4678E85e3773AB142cC46afC8D57B078792eBf74',
  //     256: '0x4678E85e3773AB142cC46afC8D57B078792eBf74',
  //   },
  //   tokenAddresses: {
  //     42: '0x04f535663110a392a6504839beed34e019fdb4e0',
  //     1: '0x04f535663110a392a6504839beed34e019fdb4e0',
  //     256: '0x04f535663110a392a6504839beed34e019fdb4e0',
  //   },
  //   name: 'USDT—ETH',
  //   symbol: 'USDT—ETH SALP',
  //   tokenSymbol: 'ETH',
  //   icon: '🍐',
  // },
  // {
  //   pid: 1,
  //   lpAddresses: {
  //     42: '0xdcd6A829a705D2f022432C1A2B6532101FA37B27',
  //     1: '0xdcd6A829a705D2f022432C1A2B6532101FA37B27',
  //     97: '0xdcd6A829a705D2f022432C1A2B6532101FA37B27',
  //     56: '0xdcd6A829a705D2f022432C1A2B6532101FA37B27',
  //   },
  //   tokenAddresses: {
  //     42: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //     1: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //     97: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //     56: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //   },
  //   name: 'Sashimi Party!',
  //   symbol: 'HT-SASHIMI SALP LP',
  //   tokenSymbol: 'SASHIMI',
  //   icon: '🍣',
  // },
  // {
  //   pid: 0,
  //   lpAddresses: {
  //     42: '0xC55Eb93e887D283d3616eC47e4c783Ad57b5Dab0',
  //     1: '0xC55Eb93e887D283d3616eC47e4c783Ad57b5Dab0',
  //     97: '0xC55Eb93e887D283d3616eC47e4c783Ad57b5Dab0',
  //     56: '0xC55Eb93e887D283d3616eC47e4c783Ad57b5Dab0',
  //   },
  //   tokenAddresses: {
  //     42: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //     1: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //     97: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //     56: '0xAe4f3a27289d49BA3cF3Dc572495Bf07C00878D2',
  //   },
  //   // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
  //   // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
  //   uniV2Pivot: true,
  //   uniV2LPAddress: '0xdcd6A829a705D2f022432C1A2B6532101FA37B27', // HT(WHT)-DAI SALP
  //   sashimiPlateInfo: {
  //     mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
  //     tokensDecimal: [18, 18],
  //     type: 10, // for normal pool
  //   },
  //
  //   name: 'HUSD-Sashimi',
  //   symbol: 'HUSD-Sashimi SALP LP',
  //   tokenSymbol: 'HUSd',
  //   icon: '🍌',
  // },
  // {
  //   pid: 2,
  //   lpAddresses: {
  //     42: '0x600e1e3dcf1a5dec900c0de66bc541bc07c438ce',
  //     1: '0x600e1e3dcf1a5dec900c0de66bc541bc07c438ce',
  //     97: '0x600e1e3dcf1a5dec900c0de66bc541bc07c438ce',
  //     56: '0x600e1e3dcf1a5dec900c0de66bc541bc07c438ce',
  //   },
  //   tokenAddresses: {
  //     42: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
  //     1: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
  //     97: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
  //     56: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
  //   },
  //   name: 'HT-ETH',
  //   symbol: 'HT-ETH SALP',
  //   tokenSymbol: 'ETH',
  //   icon: '🍎',
  // },
];

export const supportedStaking = [
  {
    stakingAddress: {
      42: '0x49FC6E18338680C660c750ED54b355c214421f3A',
      1: '0x49FC6E18338680C660c750ED54b355c214421f3A',
      97: '0x49FC6E18338680C660c750ED54b355c214421f3A',
      56: '0x49FC6E18338680C660c750ED54b355c214421f3A',
    },
    stakeToken: '0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4',
    name: 'BNB-KAOYA',
    symbol: 'BNB',
    stakeSymbol: 'KAOYA',
    decimal: 18,
    icon: 'https://bscscan.com/images/svg/brands/bnb.svg',
  },
  {
    stakingAddress: {
      42: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
      1: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
      97: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
      56: '0xb9f72a39AB304D5E6a6f1ADCcA4A11Ff3C330350',
    },
    stakeToken: '0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4',
    name: 'BUSD-KAOYA',
    symbol: 'BUSD',
    stakeSymbol: 'KAOYA',
    decimal: 18,
    icon: 'https://bscscan.com/token/images/busd_32.png',
  },
];
// Vault
// TODO: replace
export const vaultController = '0x3884eab512bB0475100997271EC83163DAa944AE';
export const vaults = [];

export const vaultStableTokenPriceAPI = 'http://39.98.34.153:8081/api/price';
