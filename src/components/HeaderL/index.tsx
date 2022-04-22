import { ChainId } from '@uniswap/sdk'
import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../../assets/img/logo.png'
import LogoDark from '../../assets/img/logo.png'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import Web3Status from '../Web3Status'
// import { Select } from './Select'
import { YellowCard } from '../Card'
import Settings from '../Settings'

import {
  HeaderContainer,
  HeaderWrapper,
  LogoAndMenuWrapper,
  MenuWrapper,
  MenuItem,
  ButtonWrapper,
  SelectWrapper,
  MenuListWrapper,
  MobileMenu,
  MobileImg,
  MobileItem,
  OverLay
} from './styles'

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: row;
    align-items: center;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan'
}

export default function Header() {
  const [isDark] = useDarkModeManager()
  const history = useHistory()
  const { pathname } = useLocation()

  const [isMobileMenu, setIsMobileMenu] = useState(false)

  const menuList = [
    { link: '/', title: 'Home' },
    { link: '/farms', title: 'Farms' },
    { link: '/swap', title: 'Exchanges' },
    { link: '/staking', title: 'Staking' },
    { link: '/airdrop', title: 'Airdrop' }
  ]

  const handleChangePage = (index: string) => {
    history.push(index)
    if (isMobileMenu) setIsMobileMenu(false)
  }

  const handleChangeLink = (link: string) => {
    window.open(link)
  }

  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <LogoAndMenuWrapper>
            <img src={isDark ? LogoDark : Logo} alt="logo" onClick={() => handleChangePage('/')} />
            <MenuWrapper>
              {menuList.map((menu, i) => (
                <MenuItem key={i} onClick={() => handleChangePage(menu.link)} className={`${pathname === menu.link ? 'active' : 'item'}`}>
                  <span>{menu.title}</span>
                </MenuItem>
              ))}
              <MenuItem onClick={() => handleChangeLink('https://info.sashimi.cool/')}>
                <span>Doc</span>
              </MenuItem>
            </MenuWrapper>
            <MenuListWrapper onClick={() => setIsMobileMenu(true)}>
              <MenuListIcon />
            </MenuListWrapper>
          </LogoAndMenuWrapper>
          <ButtonWrapper>
            {/* <SelectWrapper>
              <Select />
            </SelectWrapper> */}
            <Web3Status />
            <Settings />
          </ButtonWrapper>
        </HeaderWrapper>
      </HeaderContainer>
      {isMobileMenu && <OverLay onClick={() => setIsMobileMenu(false)} />}
      <MobileMenu style={{ width: isMobileMenu && '75%' }}>
        <div>
          <MobileImg src={Logo} alt="logo" onClick={() => handleChangePage('/')} />
          {menuList.map((menu, i) => (
            <MobileItem key={i} onClick={() => handleChangePage(menu.link)}>
              <span>{menu.title}</span>
            </MobileItem>
          ))}
          <MobileItem onClick={() => handleChangeLink('https://info.sashimi.cool/')}>
            <span>Doc</span>
          </MobileItem>
        </div>
      </MobileMenu>
    </>
  )
}

export function HeaderControls() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  return (
    <Controls>
      <HeaderElement>
        <TestnetWrapper>
          {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
        </TestnetWrapper>
        <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
          {account && userEthBalance ? (
            <BalanceText style={{ flexShrink: 0,color:"white" }} pl="0.75rem" pr="0.5rem" fontWeight={500} >
              {userEthBalance?.toSignificant(4)} ETH
            </BalanceText>
          ) : null}
          <Web3Status />
        </AccountElement>
      </HeaderElement>
      <HeaderElementWrap>
        <Settings />
      </HeaderElementWrap>
    </Controls>
  );
}

export const MenuListIcon = () => {
  return (
    <svg viewBox="64 64 896 896" focusable="false" data-icon="menu" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
    </svg>
  )
}
