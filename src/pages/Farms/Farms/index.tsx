import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import {
  Button
} from 'antd';
import { useWallet } from 'use-wallet'
import { useActiveWeb3React } from '../../../hooks'

import Page from '../../../components/Page'
import WalletProviderModal from '../../../components/WalletProviderModal'

import useModal from '../../../hooks/useModal'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'
import styled from "styled-components";

// const Migration: React.FC = () => {
//   return <div>
//     <h3>The liquidity migration will begin at Monday, Sep 28 2020 11:10 AM UTC and will be completed shortly!</h3>
//     <p>What this means for you:</p>
//     <p>  1⃣️ You don't have to do anything!</p>
//     <p>  2⃣️The tokens you're staking on uniswap will automatically get migrated to SashimiSwap Exchange.</p>
//     <p>After the migration, you will start to earn trasanction fees from Sashimi and all of Sashimi 2.0’s features will be available for public, stay tuned!</p>
//   </div>;
// };

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { connect } = useWallet()
  const { account, library } = useActiveWeb3React()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  useEffect(() => {
    if(library === undefined || !!account) return

    if(library.connection.url === "metamask") {
      connect('injected')
    } else {
      connect('walletconnect')
    }
  }, [library, account])

  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <BannerWrapper>
                <TextWrapper>
                  <h1>Select Your Favorite Dishes</h1>
                  <p>Earn KAOYA tokens by staking KAOYA LP Tokens.</p>
                </TextWrapper>
              </BannerWrapper>
              <FarmCards />
            </Route>
          </>
        ) : (
          <>
            <StyledDiv>
              <Button
                onClick={onPresentWalletProviderModal}
                type="primary"
                size="large"
              >
                🔓 Unlock Wallet
              </Button>
            </StyledDiv>
          </>
        )}
      </Page>
    </Switch>
  )
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`

const BannerWrapper = styled.div`
  background-image: url('/images/farm_banner.png');
  width: 100%;
  height: 330px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
  margin-top: 30px;
  display: flex;
  align-items: end;
  justify-content: center;
  @media (max-width: 768px) {
    height: 200px;
  }
`

const TextWrapper = styled.div`
  > h1 {
    font-family: 'Poppins';
    font-weight: 700;
    font-size: 56px;
    line-height: 120%;
    text-align: center;
    color: #FFFFFF;
    margin: 0;
    @media (max-width: 768px) {
      font-size: 30px;
    }
  }
  > p{
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 18px;
    line-height: 180%;
    text-align: center;
    color: #FFFFFF;
    margin-bottom: 50px;
    @media (max-width: 768px) {
      font-size: 14px;
      margin-bottom: 30px;
    }
  }
`

export default Farms
