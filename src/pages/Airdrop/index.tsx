import React, { useEffect, useMemo, useState } from 'react'
import Card from '../../components/CardF'
import CardContent from '../../components/CardContentF'
import Value from '../../components/ValueF'
import styled from 'styled-components'
import {
    Button
} from 'antd';
import { useActiveWeb3React } from '../../hooks'
import useYam from '../../hooks/useYam'
import { getAirdropContract, getBusdStakingContract } from '../../sushi/utils'
import { Contract } from 'web3-eth-contract'
import useUserInfo from '../../hooks/useUserInfo'
import useCheckAirdrop from '../../hooks/useCheckAirdrop'
import useBnbAirdrop from '../../hooks/useGetAirdrop'
import { useBusdAirdrop } from '../../hooks/useGetAirdrop'

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`


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
    &:disabled {
        cursor: not-allowed;
    }
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

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export default function Airdrop() {

    const { account } = useActiveWeb3React()
    const yam = useYam();
    const bnbStakingContract: Contract = useMemo(() => getBusdStakingContract(yam, "bnb"), [yam]);
    const busdStakingContract: Contract = useMemo(() => getBusdStakingContract(yam, "busd"), [yam]);
    const bnbAirdropContract: Contract = useMemo(() => getAirdropContract(yam, "bnb"), [yam]);
    const busdAirdropContract: Contract = useMemo(() => getAirdropContract(yam, "busd"), [yam]);

    const bnbUserInfo = useUserInfo(bnbStakingContract)
    const busdUserInfo = useUserInfo(busdStakingContract)

    const bnbAirDrop = useCheckAirdrop(bnbAirdropContract, bnbUserInfo.depositTime)
    const busdAirDrop = useCheckAirdrop(busdAirdropContract, busdUserInfo.depositTime)

    const { onBnbAirdrop } = useBnbAirdrop(bnbAirdropContract)
    const { onBusdAirdrop } = useBusdAirdrop(busdAirdropContract)

    return <>
        {!!account ? (
            <StyledFarm>
                <StyledCardsWrapper>
                    <StyledCardWrapper>
                        <Card>
                            <CardContent>
                                <StyledCardContentInner>
                                    <StyledCardHeader>
                                        <StyledCardIcon><img src="https://bscscan.com/images/svg/brands/bnb.svg" style={{ width: "50px" }} /></StyledCardIcon>
                                        <StyledLabel>Airdrop BNB</StyledLabel>
                                    </StyledCardHeader>
                                    <StyledCardActions>
                                        {!account ? (
                                            <EllipsisButton
                                                // onClick={handleApprove}
                                                type="primary"
                                                size="large"
                                                block
                                                title="Connect Wallet"
                                            >
                                                Connect Wallet
                                            </EllipsisButton>
                                        ) : bnbAirDrop ? (
                                            <>
                                                <StyledButton
                                                onClick={() => onBnbAirdrop()}
                                                ><span>Airdrop</span></StyledButton>
                                            </>
                                        )
                                            : (
                                                <>
                                                    <StyledButton
                                                    disabled
                                                    // onClick={() => setShowWithdraw(true)}
                                                    ><span>You are not eligible for airdrop</span></StyledButton>
                                                </>
                                            )}
                                    </StyledCardActions>
                                </StyledCardContentInner>
                            </CardContent>
                        </Card>
                    </StyledCardWrapper>
                    <StyledCardWrapper>
                        <Card>
                            <CardContent>
                                <StyledCardContentInner>
                                    <StyledCardHeader>
                                        <StyledCardIcon><img src="https://bscscan.com/token/images/busd_32.png" style={{ width: "50px" }} /></StyledCardIcon>
                                        <StyledLabel>Airdrop BUSD</StyledLabel>
                                    </StyledCardHeader>
                                    <StyledCardActions>
                                        {!account ? (
                                            <EllipsisButton
                                                // onClick={handleApprove}
                                                type="primary"
                                                size="large"
                                                block
                                                title="Connect Wallet"
                                            >
                                                Connect Wallet
                                            </EllipsisButton>
                                        ) : busdAirDrop ? (
                                            <>
                                                <StyledButton
                                                onClick={() => onBusdAirdrop()}
                                                ><span>Airdrop</span></StyledButton>
                                            </>
                                        ) : (
                                            <>
                                                <StyledButton
                                                disabled
                                                // onClick={() => setShowWithdraw(true)}
                                                ><span>You are not eligible for airdrop</span></StyledButton>
                                            </>
                                        )}
                                    </StyledCardActions>
                                </StyledCardContentInner>
                            </CardContent>
                        </Card>
                    </StyledCardWrapper>
                </StyledCardsWrapper>
            </StyledFarm>
        ) : (
            <>
                <StyledDiv>
                    <Button
                        // onClick={onPresentWalletProviderModal}
                        type="primary"
                        size="large"
                    >
                        🔓 Unlock Wallet
                    </Button>
                </StyledDiv>
            </>
        )}

    </>
}