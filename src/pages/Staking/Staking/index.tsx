import React, { useMemo, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import PageHeader from '../../../components/PageHeader'
import Spacer from '../../../components/SpacerF'

import useYam from '../../../hooks/useYam'
import { useFarm } from '../../../hooks/useFarms'
import useRedeem from '../../../hooks/useRedeem'
import { getContract } from '../../../utils/erc20'
import { getBusdStakingContract, getSushiContract, getMasterChefContract } from '../../../sushi/utils'

import Harvest from './components/Harvest'
import Stake from './components/Stake'
import { useActiveWeb3React } from '../../../hooks'
import { supportedStaking } from '../../../sushi/lib/constants/bsc-test'

const Staking: React.FC = () => {
  const { symbol } = useParams()
  const { library } = useActiveWeb3React();
  const yam = useYam();
  const [selectedStaking, setStaking]: any = useState([])

  useEffect(() => {
    let staking: any = supportedStaking.filter(item => item.symbol === symbol)
    console.log(staking)
    setStaking(...staking)
  }, [symbol])

  const busdStakingContract: Contract = useMemo(() => getBusdStakingContract(yam, selectedStaking.symbol), [library, yam, selectedStaking]);

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])

  // const yam = useYam()
  // const { library } = useActiveWeb3React()
  const sushiContract: Contract = useMemo(() => getSushiContract(yam), [library, yam]);
  // const lpContract = useMemo(() => {
  //   return getContract(library.provider as provider, selectedStaking.stakeToken)
  // }, [library, selectedStaking])

  // const { onRedeem } = useRedeem(getMasterChefContract(yam))

  // const lpTokenName = useMemo(() => {
  //   return lpToken.toUpperCase()
  // }, [lpToken])

  // const earnTokenName = useMemo(() => {
  //   return earnToken.toUpperCase()
  // }, [earnToken])

  return (
    <>
      <StyledCardIcon><img src={selectedStaking.icon} style={{ width: "50px" }} /></StyledCardIcon>
      <TextWrapper>
        <h1>{selectedStaking.name}</h1>
        <p>{`Deposit KAOYA Tokens and earn ${selectedStaking.symbol}`}</p>
      </TextWrapper>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest
              busdStakingContract={busdStakingContract}
              stake={selectedStaking}
            />
          </StyledCardWrapper>
          <StyledCardWrapper>
            <Stake
              busdStakingContract={busdStakingContract}
              lpContract={sushiContract}
              stake={selectedStaking}
              tokenName={selectedStaking.stakeSymbol}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledInfo>
          ⭐️ Every time you stake and unstake KAOYA tokens, the contract will
          automatically harvest {selectedStaking.symbol} rewards for you!
        </StyledInfo>
        <Spacer size="lg" />
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 856px;
  justify-content: space-around;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.text1};
  font-family: Poppins;
  font-size: 18px;
  line-height: 180%;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`
const StyledCardIcon = styled.div`
  background-color: ${props => props.theme.grey[200]};
  font-size: 80px;
  height: 150px;
  width: 150px;
  border: 2px solid #FFFFFF;
  border-radius: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[3]}px;
  margin-top: 100px;
`

const TextWrapper = styled.div`
font-family: Poppins;
  color: ${(props) => props.theme.text1};
  text-align: center;
  > h1 {
    font-weight: 700;
    font-size: 40px;
    line-height: 140%;
    margin-bottom: 0;
  }
  >p {
    font-weight: 400;
    font-size: 18px;
    line-height: 180%;
  }
`

export default Staking
