import * as testKovan from './constants/test-kovan';
import * as online from './constants/online';
import * as onlineTest from './constants/online-test';
import * as hecoTest from './constants/heco-test';
import * as hecoMain from './constants/heco';
import * as bscTest from './constants/bsc-test';
import * as bscMain from './constants/bsc';

const CHAIN_ENV = process.env.REACT_APP_CHAIN_ENV || 'bsc-test';

const output = {
  main: online,
  kovan: testKovan,
  'online-test': onlineTest,
  'heco-test': hecoTest,
  heco: hecoMain,
  'bsc-test': bscTest, // 97
  bsc: bscMain, // 56
};

const WEI_UNIT_DECIMAL = {
  mwei: 6,
  ether: 18,
  wbtc: 8,
};

const TOKENS_DECIMAL = {
  USDT: 6,
  USDC: 6,
  SVUSDT: 6,
  SVUSDC: 6
};

export const {
  contractAddresses,
  sashimiAddress,
  wethAddress,
  wethSashimiLpPAddress,
  supportedInvestmentPools,
  supportedLendingInvestmentPools,
  unStakeOnlyPools,
  notETHPairPools,
  hiddenPools,
  doublePools,
  unStakeOnlyDoublePools,
  supportedPools,
  waitingInfo,
  vaultController,
  vaults,
  vaultStableTokenPriceAPI,
  tokenPriceAPI = 'https://min-api.cryptocompare.com/data/price', // ?fsym=ETH&tsyms=USD
  tokensDecimal = TOKENS_DECIMAL,
  weiUnitDecimal = WEI_UNIT_DECIMAL,
  timeADay = 86400000,
  wethName = 'bnb',
  sashimiPerBlock = 0.375,
} = {
  ...output[CHAIN_ENV],
};
