import React, { useEffect, useState } from 'react'
import {
  Button,
  Divider,
  Row,
  Col
} from 'antd';
import {
  Link
} from 'react-router-dom';
import styled, { keyframes } from 'styled-components'
import Countdown, { CountdownRenderProps } from 'react-countdown'

import Card from '../../../../components/CardF'
import CardContent from '../../../../components/CardContentF'
import CardIcon from '../../../../components/CardIcon'
import Loader from '../../../../components/LoaderF'
import Spacer from '../../../../components/SpacerF'

import useFarms from '../../../../hooks/useFarms'
import BigNumber from 'bignumber.js'

import { Farm } from '../../../../contexts/Farms'

import useAllStakedValue, {
  StakedValue,
} from '../../../../hooks/useAllStakedValue'

import { BASIC_TOKEN } from '../../../../constants/config';
import {
  notETHPairPools, unStakeOnlyPools, hiddenPools, doublePools,
  waitingInfo
} from '../../../../sushi/lib/constants';
import { supportedStaking } from '../../../../sushi/lib/constants/bsc-test';
import sashimiLog from '../../../../assets/img/logo_sashimi.png';
import { getEthChainInfo } from "../../../../utils/getEthChainInfo";
import { contractAddresses, wethName, sashimiPerBlock } from "../../../../sushi/lib/constants";

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber,
  allocPoint: BigNumber
  totalAllocPoint: BigNumber
}

const SashimiLogo = () => (
  <StyledLogo src={sashimiLog} />
)

function setFarmRows(farmRows: FarmWithStakedValue[][], rowsValue: FarmWithStakedValue): void {
  if (farmRows[farmRows.length - 1].length === 4) {
    farmRows.push([rowsValue])
  } else {
    farmRows[farmRows.length - 1].push(rowsValue)
  }
}

const StyledLogo = styled.img`
  height: 16px;
  margin-top: -4px;
  margin-right: 2px;
`

let burnPoolPercent: BigNumber = new BigNumber(0);
const {
  waitingPool,
  startTime
} = waitingInfo;
const FarmCards: React.FC = () => {
  const [farms] = useFarms()
  const stakedValue = useAllStakedValue()

  const sushiIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === BASIC_TOKEN,
  )

  const sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex]
      ? stakedValue[sushiIndex].tokenPriceInWeth
      : new BigNumber(0)
  // ETH
  // const BLOCKS_PER_YEAR = new BigNumber(2336000)
  // const SASHIMI_PER_BLOCK = new BigNumber(100)
  // HECO
  const BLOCKS_PER_YEAR = new BigNumber(10512000); // block/3s
  const SASHIMI_PER_BLOCK = new BigNumber(sashimiPerBlock);

  let ethValueInSashimiNoWeight = new BigNumber(0);
  const unStakeOnlyPoolsRows: FarmWithStakedValue[][] = [[]];
  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      const newFarmRows = [...farmRows]
      // Do not show burn pool
      if (farm.pid === 11) {
        if (stakedValue[i] && !stakedValue[i].totalAllocPoint.isEqualTo(0)) {
          burnPoolPercent = stakedValue[i].allocPoint.div(stakedValue[i].totalAllocPoint);
        }
        return newFarmRows;
      }

      // No hidden Pool
      if (hiddenPools.includes(farm.pid) || doublePools.includes(farm.pid)) {
        return newFarmRows;
      }

      const notETHTokenPair = notETHPairPools.includes(farm.pid);
      // TODO: Better code to get weth value of tokenNotEth-tokenNotEth
      if (stakedValue[i] && !notETHTokenPair) {
        ethValueInSashimiNoWeight = ethValueInSashimiNoWeight.plus(stakedValue[i].totalWethValue);
      }

      let stakedValueCurrentTotalWethValue = stakedValue[i] && stakedValue[i].totalWethValue;
      if (stakedValue[i] && notETHTokenPair && stakedValue[i].totalWethValue.toNumber() === 0) {
        stakedValueCurrentTotalWethValue = stakedValue[i].tokenAmount.times(sushiPrice).times(new BigNumber(2)) || new BigNumber(0);
        ethValueInSashimiNoWeight = ethValueInSashimiNoWeight.plus(stakedValueCurrentTotalWethValue);
      }

      let farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? sushiPrice
            .times(SASHIMI_PER_BLOCK)
            .times(BLOCKS_PER_YEAR)
            .times(stakedValue[i].poolWeight)
            .div(stakedValueCurrentTotalWethValue.isNaN() || stakedValueCurrentTotalWethValue.eq(0)
              ? new BigNumber(0.01) : stakedValueCurrentTotalWethValue)
          : null,
      }

      if (unStakeOnlyPools.includes(farm.pid)) {
        setFarmRows(unStakeOnlyPoolsRows, farmWithStakedValue);
        return newFarmRows;
      }

      setFarmRows(newFarmRows, farmWithStakedValue);
      return newFarmRows
    },
    [[]],
  )

  function getStyleRow(farmRow: any, unStakeOnly?: boolean) {
    return <StyledRow>
      {farmRow.map((farm, i) => (
      <React.Fragment key={i}>
        <FarmCard farm={farm} unStakeOnly={unStakeOnly} />
        {(i === 0 || i === 1 || i === 2) && <StyledSpacer />}
      </React.Fragment>
       ))}
    </StyledRow>;
  }

  return (
    <StyledCards>
      <ValueETH>Our Dishes</ValueETH>
      {!!supportedStaking.length ? getStyleRow(supportedStaking, false)
        : (
          <StyledLoadingWrapper>
            <Loader text="Cooking the rice ..." />
          </StyledLoadingWrapper>
        )}

      {/* <Line />
      <ValueETH>Pools with no profit of kaoya temporarily</ValueETH>

      {!!unStakeOnlyPoolsRows[0].length && (
        unStakeOnlyPoolsRows.map((farmRow, i) => getStyleRow(farmRow, i, true))
      )} */}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue,
  unStakeOnly?: Boolean
}

let farmExchangeAddURL: {
  [key: string]: string
} = {};
const {
  chainId
} = getEthChainInfo();
const checkWHT = (address: string) => {
  if (address.toLowerCase() === contractAddresses.weth[chainId].toLowerCase()) {
    return wethName;
    // return 'ht'
    // return 'bnb'
  }
  return address;
};
const FarmCard = ({ farm, unStakeOnly = false }) => {

  const [exchangeAddURL, setExchangeAddURL] = useState(farmExchangeAddURL[farm.pid] || '');
  // useEffect(() => {
  //   const getTokens = async () => {
  //     const tokens = await Promise.all([
  //       farm.lpContract.methods.token0().call(),
  //       farm.lpContract.methods.token1().call()
  //     ]);
  //     farmExchangeAddURL[farm.pid] = `/#/add/${checkWHT(tokens[0])}/${checkWHT(tokens[1])}`;
  //     setExchangeAddURL(`/#/add/${checkWHT(tokens[0])}/${checkWHT(tokens[1])}`);
  //   };
  //   getTokens();
  // }, [farm]);

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds, days } = countdownProps;
    const hoursTemp = hours + days * 24;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hoursTemp < 10 ? `0${hoursTemp}` : hoursTemp
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  let poolActive = true // startTime * 1000 - Date.now() <= 0
  if (waitingPool.includes(farm.pid)) {
    poolActive = startTime - Date.now() <= 0;
  }

  let farmApy: any;
  if (farm.apy && farm.apy.isNaN()) {
    farmApy = '- %';
  } else {
    farmApy = farm.apy
      ? `${farm.apy
        .times(new BigNumber(100))
        .toNumber()
        .toLocaleString('en-US')
        .slice(0, -1) || '-'}%`
      : 'Loading ...';
  }

  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === 'KAOYA' && <StyledCardAccent />}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon><img src={farm.icon} style={{ width: "40px"}} /></CardIcon>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit KAOYA</StyledDetail>
              <StyledDetail>Earn {farm.symbol}</StyledDetail>
            </StyledDetails>
            {/* <StyledInsight>
              <span>APY</span>
              <span>
                {farmApy}
              </span>
            </StyledInsight> */}
            <ButtonContainer>
              <StyledButton
                size="large"
                type="primary"
                disabled={!poolActive}
                block
              >
                <Link to={`/staking/${farm.symbol}`}>
                  {
                    poolActive ? 'Select' : (
                      <Countdown
                        date={new Date(startTime)}
                        renderer={renderer}
                      />
                    )
                  }
                </Link>
              </StyledButton>
              {/* <Col span={11} offset={2}>
                {farm.isSashimiPlate ? <StyledButton
                    size="large"
                    type="primary"
                    href="/vault"
                    target="_blank"
                    block
                  >
                    <SashimiLogo /> GET SV
                  </StyledButton> :  <StyledButton
                    size="large"
                    type="primary"
                    disabled={exchangeAddURL === ''}
                    // href={`https://info.sashimi.cool/pair/${farm.lpTokenAddress}`}
                    href={exchangeAddURL}
                    target="_blank"
                    block
                  >
                    <SashimiLogo /> GET LP
                  </StyledButton>}
              </Col> */}
            </ButtonContainer>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`

	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const ValueETH = styled.div`
  color: ${(props) => props.theme.text1};
  font-size: 40px;
  line-height: 140%;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: left;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding-bottom: ${(props) => props.theme.spacing[5]}px;
  padding-top: ${(props) => props.theme.spacing[5]}px;
`

const Line = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.text1};
    width: 100%;
    height: 1px;
    opacity: 0.3;
    margin: 32px 0 16px 0;
`

const ButtonContainer = styled(Row)`
  width: 100%;
`

const StyledButton = styled(Button)`
  background: linear-gradient(87.67deg, #F6881E 0%, #EF2E24 100%) !important;
  border-radius: 6px !important;
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: 0;
`

const StyledCards = styled.div`
  width: 100%;
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 1200px;
  @media (max-width: 1360px) {
    width: 700px;
    margin: auto;
    justify-content: center;
    >div:nth-child(4) {
      display: none;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((1300px - ${(props) => props.theme.spacing[4]}px * 3) / 4);
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.text1};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
  display: flex;
  align-items: center;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  padding-bottom: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.text1};
  font-size: 18px;
  line-height: 180%;
  font-weight: 400;
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  color: ${(props) => props.theme.text1};
  width: 100%;
  font-size: 20px;
  line-height: 140%;  
  text-align: center;
  padding: 15px 12px 0 12px;
  margin-top: 0px;
  margin-bottom: 16px;
  border-top: 1px dashed #FFFFFF;
`

const StyledDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom:  7px;
`

const StyledCardIcon = styled.div`
  background-color: ${props => props.theme.grey[200]};
  font-size: 36px;
  height: 80px;
  width: 80px;
  border: 2px solid #FFFFFF;
  border-radius: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[3]}px;
`

export default FarmCards
