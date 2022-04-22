import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import PageHeader from '../../../components/PageHeader'
import Spacer from '../../../components/SpacerF'

import useYam from '../../../hooks/useYam'
import { useFarm } from '../../../hooks/useFarms'
import useRedeem from '../../../hooks/useRedeem'
import { getContract } from '../../../utils/erc20'
import { getMasterChefContract } from '../../../sushi/utils'

import Harvest from './components/Harvest'
import Stake from './components/Stake'
import { useActiveWeb3React } from '../../../hooks'

const Farm: React.FC = () => {
  const { farmId } = useParams()
  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const yam = useYam()
  const { library } = useActiveWeb3React()
  
  const lpContract = useMemo(() => {
    return getContract(library.provider as provider, lpTokenAddress)
  }, [library, lpTokenAddress])

  const { onRedeem } = useRedeem(getMasterChefContract(yam))

  const lpTokenName = useMemo(() => {
    console.log(lpToken)
    return lpToken.toUpperCase()
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <>
      <StyledCardIcon>{icon}</StyledCardIcon>
      <TextWrapper>
        <h1>{name}</h1>
        <p>{`Deposit ${lpTokenName}  Tokens and earn ${earnTokenName}`}</p>
      </TextWrapper>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest pid={pid} />
          </StyledCardWrapper>
          <StyledCardWrapper>
            <Stake
              lpContract={lpContract}
              pid={pid}
              tokenName={lpToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledInfo>
          ⭐️ Every time you stake and unstake LP tokens, the contract will
          automatically harvest KAOYA rewards for you!
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

export default Farm
