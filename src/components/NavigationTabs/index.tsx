import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { NavLink, Link as HistoryLink } from 'react-router-dom'

import { ArrowLeft } from 'react-feather'
import { RowBetween } from '../Row'
import QuestionHelper from '../QuestionHelper'

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 70px;
  margin-bottom : 50px;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  width: 207px;
  height: 60px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: #121127;
  background: #FFFFFF;
  font-family: Poppins;
  font-weight: 700;
  font-size: 20px;
  line-height: 140%;

  &.${activeClassName}.swap {
    background: linear-gradient(87.67deg, #F6881E 0%, #EF2E24 100%);
    color: #ffffff;
  }
  &.${activeClassName}.pool {
    background: linear-gradient(87.67deg, #EF2E24 0%, #F6881E 100%);
    color: #ffffff;
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`

export function SwapPoolTabs({ active }: { active: 'swap' | 'pool' }) {
  const { t } = useTranslation()
  return (
    <Tabs style={{ marginBottom: '30px' }}>
      <StyledNavLink id={`swap-nav-link`} className="swap" to={'/swap'} isActive={() => active === 'swap'}>
        {t('swap')}
      </StyledNavLink>
      <StyledNavLink id={`pool-nav-link`} className="pool" to={'/pool'} isActive={() => active === 'pool'}>
        {t('pool')}
      </StyledNavLink>
    </Tabs>
  )
}

export function FindPoolTabs() {
  return (
      <RowBetween style={{ padding: '20px 30px' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText style={{ fontWeight: 'bold', fontSize: 40, color: '#121127' }}>Import Pool</ActiveText>
        <QuestionHelper text={"Use this tool to find pairs that don't automatically appear in the interface."} />
      </RowBetween>
  )
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  return (
      <RowBetween style={{ padding: '20px 30px' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText style={{ fontWeight: 'bold', fontSize: 40, color: '#121127' }}>{adding ? 'Add' : 'Remove'} Liquidity</ActiveText>
        <QuestionHelper
          text={
            adding
              ? 'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
              : 'Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.'
          }
        />
      </RowBetween>
  )
}
