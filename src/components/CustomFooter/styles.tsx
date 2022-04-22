import styled from 'styled-components'
import React from 'react'

const ContainerStyled = styled.div`
  width: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  background-repeat: no-repeat, repeat;
  background-size: cover;
  object-fit: cover;
  background-position: center;
`
export const Container = (props: any) => {
  return (
    <ContainerStyled {...props} style={{ backgroundImage: `url(${props.bgimage})` }}>
      {props.children}
    </ContainerStyled>
  )
}

export const InnerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 15px;
`

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  > img {
    width: 105px;
  }
`

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  flex-direction: column;

  @media (min-width: 576px) {
    flex-direction: row;
  }
`

export const MenuLink = styled.a`
  transition: all 0.2s linear;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  margin: 10px;
  &:hover {
    color: #f6881e;
  }

  @media (min-width: 768px) {
    margin: 10px 20px;
  }
`

export const Divider = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 1px;
  margin-top: 40px;
`

export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;

  @media (min-width: 576px) {
    flex-direction: row;
  }
`

export const CopyWriter = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  padding: 20px 0px;
`

export const SocialList = styled.div`
  display: flex;
  align-items: center;

  > a {
    margin: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: linear-gradient(87.67deg, #f6881e 0%, #ef2e24 100%);
    border-radius: 40px;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.07);
    }
    &:last-child {
      margin-right: 0px;
    }
  }
`
