import styled, { css } from 'styled-components'

export const HeaderContainer = styled.div`
  width: 100%;
  z-index: 2;
  border-bottom: 1px solid #ffffff;
`

export const HeaderWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`

export const LogoAndMenuWrapper = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

  @media (min-width: 993px) {
    > img {
      width: 64px;
      height: 64px;
      object-fit: cover;
    }
  }
`

export const MenuWrapper = styled.div`
  display: none;
  align-items: center;
  padding-left: 15px;

  @media (min-width: 800px) {
    display: flex;
  }

  @media (min-width: 993px) {
    padding-left: 45px;
  }
`

export const MenuItem = styled.div`
  margin: 0px 10px;
  cursor: pointer;

  > span {
    padding: 5px 0px;
    font-weight: 500;
    font-size: 16px;
    color: #383751;
    position: relative;
    transition: all 0.3s linear;
    &:hover {
      background: linear-gradient(87.67deg, #f6881e 0%, #ef2e24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
  &.active {
    > span {
      background: linear-gradient(87.67deg, #f6881e 0%, #ef2e24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        transition: all 0.3s linear;
        background: linear-gradient(87.67deg, #f6881e 0%, #ef2e24 100%);
        left: 0px;
        bottom: 0;
      }
    }
  }

  @media (min-width: 993px) {
    margin: 0px 25px;
    > span {
      padding: 10px 0px;
    }
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
`

export const SelectWrapper = styled.div`
  margin-right: 12px;
  display: none;

  @media (min-width: 576px) {
    display: flex;
    align-items: center;
  }
`

export const MenuListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 15px;
  cursor: pointer;

  svg {
    font-size: 24px;
    color: #ff7900;
  }

  @media (min-width: 576px) {
    margin: 0px 30px;
  }

  @media (min-width: 800px) {
    display: none;
  }
`

export const MobileMenu = styled.div`
  & > div {
    padding: 1.8em 1.8em 1.8em 1.8em;
    font-size: 1.15em;
  }
  position: fixed;
  right: inherit;
  z-index: 1100;
  width: 0%;
  height: 100%;
  transition: all 0.5s ease 0s;
  top: 0px;
  left: 0px;
  overflow: auto;
  background: rgb(255, 255, 255);

  @media (min-width: 800px) {
    display: none;
  }
`

export const MobileImg = styled.img`
  padding-bottom: 25px;
  width: 40px;
`

export const MobileItem = styled.div`
  padding: 24px 24px 24px 0px;
  border-bottom: 1px solid #efefef;
  & > span {
    font-weight: 500 !important;
    font-size: 24px !important;
    margin-top: 24px !important;
    margin-bottom: 24px !important;
    transition: 0.2s;
  }
`

export const OverLay = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: 1;
  transition: opacity 0.3s ease 0s;
  top: 0px;
  left: 0px;

  @media (min-width: 800px) {
    display: none;
  }
`
