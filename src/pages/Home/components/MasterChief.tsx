import React from 'react'
import styled from 'styled-components'
import { Button } from '../../../components/Shared'
import { useHistory } from 'react-router-dom'
import Balances from './Balances'

const Container = styled.div`
  padding: 70px 0px 50px 0px;
  font-family: Poppins;
`

const HeaderWrapper = styled.div`
  position: relative;

  h1 {
    font-weight: 700;
    font-size: 40px;
    color: #121127;
    margin-top: 0px;
    margin-bottom: 10px;
    text-align: center;
    line-height: 53px;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    color: #121127;
    margin: 0px;
    text-align: center;
  }

  @media (min-width: 576px) {
    > h1 {
      font-size: 56px;
      line-height: 120%;
    }
    > p {
      font-size: 18px;
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

export const MasterChief = () => {
  const history = useHistory()

  return (
    <Container>
      <HeaderWrapper>
        <h1>Master Chef is Ready</h1>
        <p>Stake KAOYA/Uniswap LP tokens to eat your yummy KAOYA!</p>
      </HeaderWrapper>
      <Balances />
      <ButtonWrapper>
        <Button onClick={() => history.push('/farms')}>See Complete Menu</Button>
      </ButtonWrapper>
    </Container>
  )
}
