import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import {
  Layout
} from 'antd'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Header, { HeaderControls } from '../components/HeaderL'
import Popups from '../components/Popups'
import { CustomeFooter } from '../components/CustomFooter'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Home from './Home'
import AddLiquidity from './AddLiquidity'
import Farms from './Farms/Farms'
import Farm from './Farms/Farm'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Stakings from './Staking/Stakings'
import Staking from './Staking/Staking'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import Airdrop from './Airdrop'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import './styles.css'

const {
  Header: LayoutHeader
} = Layout;

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  position: relative;
  background: linear-gradient(180deg, #DDD5CC -20.93%, #E5BEB2 100%);
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  min-height: calc(100vh - 200px);
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 16px;
  `};
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const StyledHeader = styled(LayoutHeader)`
  width: 100%;
  background: ${props => props.theme.bg1};
  @media(max-width: 576px) {
    padding: 0;
  }
`

export default function App() {
  // Modal.info({
  //   title: 'Alert !!!!!!',
  //   content:
  //     'Due to the technical issues, you are unable to do anything related with $ETH. Please do NOT add liquidity nor swap with $ETH. This is a protection from financial loss !!!!'
  // })

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <Route component={GoogleAnalyticsReporter} />
        <Route component={DarkModeQueryParamReader} />
        <AppWrapper>
          <Header />
          <BodyWrapper>
            {/* <HeaderControls /> */}
            <Popups />
            <Web3ReactManager>
              <Switch>
                <Route exact strict path="/" component={Home} />
                <Route exact strict path="/farms" component={Farms} />
                <Route exact strict path={`/farms/:farmId`} component={Farm} />
                <Route exact strict path="/staking" component={Stakings} />
                <Route exact strict path={`/staking/:symbol`} component={Staking} />
                <Route exact strict path="/airdrop" component={Airdrop} />
                <Route exact strict path="/swap" component={Swap} />
                <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                <Route exact strict path="/find" component={PoolFinder} />
                <Route exact strict path="/pool" component={Pool} />
                <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                <Route exact path="/add" component={AddLiquidity} />
                <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                {/* <Route component={RedirectPathToSwapOnly} /> */}
              </Switch>
            </Web3ReactManager>
            <Marginer />
          </BodyWrapper>
          <CustomeFooter />
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
