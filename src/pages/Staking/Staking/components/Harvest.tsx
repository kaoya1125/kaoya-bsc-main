import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button
} from 'antd';
import { Contract } from 'web3-eth-contract'
import Card from '../../../../components/CardF'
import CardContent from '../../../../components/CardContentF'
import CardIcon from '../../../../components/CardIcon'
import Label from '../../../../components/Label'
import Value from '../../../../components/Value'

import useEarningBusd from '../../../../hooks/useEarningsBusd'
import {useRewardBusd} from '../../../../hooks/useReward'

import {
  getBalanceNumber, getFullDisplayBalance
} from '../../../../utils/formatBalance'
import {LogoImg} from "../../../../components/Logo/Logo";

const Harvest = ({busdStakingContract, stake}) => {
  const earnings = useEarningBusd(busdStakingContract)
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useRewardBusd(busdStakingContract)

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <StyledCardIcon>
              <img src={stake.icon} style={{ width: "50px" }} />
            </StyledCardIcon>
            <Value value={getFullDisplayBalance(earnings)} />
            <StyledLabel>{stake.symbol} Earned</StyledLabel>
          </StyledCardHeader>
          <StyledCardActions>
            <StyledButton
              disabled={!earnings.toNumber() || pendingTx}
              onClick={async () => {
                setPendingTx(true)
                try {
                  await onReward()
                  setPendingTx(false)
                } catch(e) {
                  setPendingTx(false)
                }
              }}
            >
              <span>{pendingTx ? 'Collecting KAOYA' : 'Harvest'}</span>
            </StyledButton>
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px dashed #FFFFFF;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const StyledCardIcon = styled.div`
  background-color: ${props => props.theme.grey[200]};
  height: 92px;
  width: 92px;
  border: 2px solid #FFFFFF;
  border-radius: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[3]}px;
`

const StyledLabel = styled.div`
  color: #121127;
  font-weight: 400;
  font-family: Poppins;
  font-size: 18px;
  line-height: 180%;
  text-align: center;
`

const StyledButton = styled.button`
  background: none;
  border: none;
  height: 40px;
  width: 100%;
  cursor: pointer;
  background-image: radial-gradient(circle at 100% 100%, transparent 5px, #f6881e 5px, #f6881e 6px, transparent 6px), linear-gradient(to right, #f6881e, #ef2e24), radial-gradient(circle at 0% 100%, transparent 5px, #ef2e24 5px, #ef2e24 6px, transparent 6px), linear-gradient(to bottom, #ef2e24, #ef2e24), radial-gradient(circle at 0% 0%, transparent 5px, #ef2e24 5px, #ef2e24 6px, transparent 6px), linear-gradient(to left, #ef2e24, #ec881e), radial-gradient(circle at 100% 0%, transparent 5px, #ec881e 5px, #ec881e 6px, transparent 6px), linear-gradient(to top, #ec881e, #f6881e);
  background-size: 6px 6px, calc(100% - 12px) 1px, 6px 6px, 1px calc(100% - 12px);
  background-position: top left,top center,top right,center right, bottom right,bottom center,bottom left,center left;
  background-repeat: no-repeat;
  border-radius: 6px;
  >span {
      font-family: Poppins;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      background: linear-gradient(87.67deg, #F6881E 0%, #EF2E24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
  }
`

export default Harvest
