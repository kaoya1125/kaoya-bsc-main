import React, { useCallback, useEffect, useState } from 'react'
import {
  Button
} from 'antd';
import { ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/providers'
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import BigNumber from 'bignumber.js'

import { Contract } from 'web3-eth-contract'
import Card from '../../../../components/CardF'
import CardContent from '../../../../components/CardContentF'
import CardIcon from '../../../../components/CardIcon'
import Label from '../../../../components/Label'
import Value from '../../../../components/ValueF'
import DepositModal from '../../../../components/DepositModalF'
import WithdrawModal from '../../../../components/WithdrawModalF'

import useAllowance from '../../../../hooks/useAllowance'
import useApprove from '../../../../hooks/useApprove'
import useModal from '../../../../hooks/useModal'
import useStakeBusd from '../../../../hooks/useStakeBusd'
import { useStakedBusdBalance } from '../../../../hooks/useStakedBalance'
import useTokenBalance from '../../../../hooks/useTokenBalance'
import useUnstakeBusd from '../../../../hooks/useUnstakeBusd'
import { useTokenContract } from '../../../../hooks/useContract';
import useYam from '../../../../hooks/useYam';
import { getBalanceNumber } from '../../../../utils/formatBalance'
import { calculateGasMargin } from '../../../../utils'
import { getDecimalFromSupportedPools, getMasterChefContract } from '../../../../sushi/utils'
import { useTransactionAdder } from '../../../../state/transactions/hooks';
import { useActiveWeb3React } from '../../../../hooks';
import { LogoImg } from '../../../../components/Logo/Logo';

interface StakeProps {
  busdStakingContract: Contract
  lpContract: Contract
  stake: any
  tokenName: string
}

const Stake: React.FC<StakeProps> = ({ busdStakingContract, lpContract, stake, tokenName }) => {
  const { account } = useActiveWeb3React()
  const decimal = stake.decimal;
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const allowance = useAllowance(lpContract, busdStakingContract)
  const { onApprove } = useApprove(lpContract, busdStakingContract)
  const yam = useYam()
  const masterChefContract = getMasterChefContract(yam)
  const tokenBalance = useTokenBalance(lpContract.options.address)
  const stakedBalance = useStakedBusdBalance(busdStakingContract)

  const tokenContract = useTokenContract(lpContract.options.address)
  const { onStake } = useStakeBusd(busdStakingContract)
  const { onUnstake } = useUnstakeBusd(stake, busdStakingContract)
  const addTransaction = useTransactionAdder()

  const handleDismissSearch = useCallback(() => {
    setShowDeposit(false)
    setShowWithdraw(false)
  }, [setShowDeposit])

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const estimatedGas = await tokenContract.estimateGas.approve(busdStakingContract.options.address, ethers.constants.MaxUint256).catch(() => {
        // general fallback for tokens who restrict approval amounts
        return tokenContract.estimateGas.approve(busdStakingContract.options.address, ethers.constants.MaxUint256)
      })
      return tokenContract
        .approve(busdStakingContract.options.address, ethers.constants.MaxUint256, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: 'Approve ' + ethers.constants.MaxUint256,
            approval: { tokenAddress: tokenContract.address, spender: busdStakingContract.options.address }
          })
        })
        .catch((error: Error) => {
          setRequestedApproval(false)
          console.debug('Failed to approve token', error)
          throw error
        })
    } catch (e) {
      console.log(e)
    }
  }, [setRequestedApproval, lpContract, busdStakingContract])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <StyledCardIcon><LogoImg /></StyledCardIcon>
            <Value value={getBalanceNumber(stakedBalance, decimal)} />
            <StyledLabel>{`${tokenName} Tokens Staked`}</StyledLabel>
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <EllipsisButton
                disabled={requestedApproval}
                onClick={handleApprove}
                type="primary"
                size="large"
                block
                title={`Approve ${tokenName}`}
              >
                {`Approve ${tokenName}`}
              </EllipsisButton>
            ) : (
              <>
                <StyledButton
                  disabled={stakedBalance.eq(new BigNumber(0))}
                  onClick={() => setShowWithdraw(true)}
                ><span>Unstake</span></StyledButton>
                <StyledActionSpacer />
                <Button style={{ background: 'linear-gradient(87.67deg, #F6881E 0%, #EF2E24 100%)', borderRadius: '6px' }}
                  type="primary"
                  shape="round"
                  icon={<PlusOutlined />}
                  size="large"
                  onClick={() => setShowDeposit(true)}
                />
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
      <DepositModal
        isOpen={showDeposit}
        onDismiss={handleDismissSearch}
        max={tokenBalance}
        onConfirm={onStake}
        tokenName={tokenName}
      />
      <WithdrawModal
        isOpen={showWithdraw}
        onDismiss={handleDismissSearch}
        max={stakedBalance}
        onConfirm={onUnstake}
        tokenName={tokenName}
      />
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

const EllipsisButton = styled(Button)`
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 6px !important;
  background:linear-gradient(87.67deg, #F6881E 0%, #EF2E24 100%) !important;
  font-family: Poppins;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
`

const StyledActionSpacer = styled.div`
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
  font-size: 30px;
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

export default Stake
