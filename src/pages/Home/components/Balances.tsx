import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import Card from '../../../components/CardF'
import CardContent from '../../../components/CardContentF'
import Spacer from '../../../components/SpacerF'

import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useYam from '../../../hooks/useYam'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'

import { getBalance } from '../../../utils/erc20';
import { getBalanceNumber } from '../../../utils/formatBalance'
import { getSushiSupply } from '../../../sushi/utils'
import { getSushiAddress } from '../../../sushi/utils'
import BigNumber from 'bignumber.js'
import CountUp from 'react-countup'
import { getEthChainInfo } from '../../../utils/getEthChainInfo';
import {contractAddresses, sashimiPerBlock} from "../../../sushi/lib/constants";
import { useWeb3React } from '@web3-react/core'
import { useActiveWeb3React } from '../../../hooks'

const {
  stakingPool,
  exploreURL,
  chainId
} = getEthChainInfo();

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [burnedSashimi, setBurnedSashimi] = useState<BigNumber>(new BigNumber(0));
  const [fishFeedBalance, setFishFeedBalance] = useState<BigNumber>(new BigNumber(0));
  const yam = useYam()
  const sushiBalance = useTokenBalance(getSushiAddress(yam))
  const { account, library, chainId } = useActiveWeb3React()

  useEffect(() => {
    async function fetchTotalSupply() {
      const [
        supply,
        stakedBalance,
        burnedSashimi,
        fishFeedBalance,
      ] = await Promise.all([
        getSushiSupply(yam),
        getBalance(library.provider as provider, getSushiAddress(yam), stakingPool).then(res => new BigNumber(res)),
        getBalance(library.provider as provider, getSushiAddress(yam), '0x000000000000000000000000000000000000dead').then(res => new BigNumber(res)),
        getBalance(library.provider as provider, getSushiAddress(yam), '0x84ee348617563944ffd4a23843e086a7dc0224f3').then(res => new BigNumber(res))
      ]);
      setTotalSupply(supply.minus(stakedBalance));
      setBurnedSashimi(new BigNumber(burnedSashimi));
      setFishFeedBalance(new BigNumber(fishFeedBalance));
    }
    if (yam) {
      fetchTotalSupply()
    }
  }, [yam, setTotalSupply])

  const circulatingPercent = totalSupply
    ? `(${(getBalanceNumber(totalSupply) / (10**6)).toFixed(2)}%)` : '';

  return (
    <>
      <TotalSupply>
        {account && <div>
          Total Kaoya Supply: {(100000000 - getBalanceNumber(burnedSashimi)).toLocaleString('currency', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          <a href={`${exploreURL}/address/${contractAddresses.sushi[chainId]}`} target="_blank"> Contract</a>
        </div>}
        {account && <div>
         Total Kaoya Burned: {getBalanceNumber(burnedSashimi).toLocaleString('currency', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
         <a href={`${exploreURL}/token/0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4?a=0x000000000000000000000000000000000000dead`} target="_blank"> Burn Record</a>
        </div>}
        {account && <div>
         Total in Kaoya Treasury: {getBalanceNumber(fishFeedBalance).toLocaleString('currency', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
         <a href={`${exploreURL}/address/0x84ee348617563944ffd4a23843e086a7dc0224f3#tokentxns`} target="_blank"> Treasury Record</a>
        </div>}
      </TotalSupply>
      <StyledWrapper>
        <StyledCard>
          <CardContent>
            <StyledBalances>
              <StyledBalance>
                <div style={{ flex: 1 }}>
                  <CustomLabel>Your KAOYA Balance</CustomLabel>
                  <CustomValue>{!!account ? getBalanceNumber(sushiBalance) : 'Locked'}</CustomValue>
                </div>
              </StyledBalance>
            </StyledBalances>
            <Footnote>
              Pending harvest
              <FootnoteValue>
                <PendingRewards /> KAOYA
              </FootnoteValue>
            </Footnote>
          </CardContent>
        </StyledCard>
        <Spacer />

        <StyledCard>
          <CardContent>
            <CustomLabel>{`Circulating KAOYA Supply ${circulatingPercent}`}</CustomLabel>
            <CustomValue>{totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}</CustomValue>
            <Footnote>
              New rewards per block
              {/* TODO: Follow the plan */}
              <FootnoteValue>{sashimiPerBlock} KAOYA</FootnoteValue>
            </Footnote>
          </CardContent>
        </StyledCard>
      </StyledWrapper>
    </>
  )
}

const Footnote = styled.div`
  padding: 12px 0 0 0;
  font-weight: 400;
  font-size: 18px;
  color: #121127;
  border-top: 1px solid #9d9caf;
`
const FootnoteValue = styled.div`
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  width: 100%;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
    padding: 0 16px;
  }
`

const StyledCard = styled(Card)`
  max-width: 950px;
  margin: 0 auto;
  background: #F9F9FB;
  box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.13);
  border-radius: 12px;
  border: none;
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

const TotalSupply = styled.div`
  color: #aa9585;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  color: #121127;
  padding-bottom: ${(props) => props.theme.spacing[3]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  a {
    font-size: 20px;
    font-weight: 700;
    color: #f03124;
  }
`

const CustomLabel = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: #121127;
  margin: 0px;
`

const CustomValue = styled.div`
  font-weight: 700;
  font-size: 32px;
  color: #121127;
`

export default Balances
