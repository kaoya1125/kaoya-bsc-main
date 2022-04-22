import React from 'react'
import styled from 'styled-components'
import heroImg from '../../../assets/img/hero-bg.png'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0px 0px 20px 0px;
  font-family: Poppins;
  @media (min-width: 576px) {
    flex-direction: row;
    padding: 50px 0px;
  }
`

export const TextWrapper = styled.div`
  width: 100%;
  > h1 {
    font-weight: 700;
    font-size: 40px;
    margin: 18px 0px;
    color: #121127;
    line-height: 120%;
  }
  > p {
    font-weight: 400;
    font-size: 14px;
    color: #383751;
    margin-bottom: 20px;
  }

  @media (min-width: 576px) {
    width: 60%;
    > h1 {
      font-size: 56px;
    }
    > p {
      font-size: 18px;
      margin-bottom: 42px;
    }
  }
`

export const ImgWrapper = styled.div`
  width: 100%;
  margin-top: 50px;

  @media (min-width: 576px) {
    width: 40%;
    margin-top: 0px;
  }
  img {
    width: 100%;
  }
`

export const HomeHero = () => {
  return (
    <Container>
      <TextWrapper>
        <h1>Chef are Ready to Serve you Kaoya</h1>
        <p>Trade, earn, and win crypto on the most popular decentralized platform in the galaxy.</p>
        {/* {
          !!account && (
            <Web3Status />
          )
        } */}
      </TextWrapper>
      <ImgWrapper>
        <img src={heroImg} alt="hero-bg" />
      </ImgWrapper>
    </Container>
  )
}
