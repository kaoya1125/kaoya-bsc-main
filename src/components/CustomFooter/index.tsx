import React from 'react'
import footerBg from '../../assets/img/footer-bg.jpg'
import logo from '../../assets/img/logo.png'
import {
  Container,
  LogoWrapper,
  MenuWrapper,
  MenuLink,
  Divider,
  FooterWrapper,
  CopyWriter,
  SocialList,
  InnerContainer
} from './styles'

export const CustomeFooter = () => {
  const linkList = [
    { link: 'https://testnet.bscscan.com/address/0x4FfCCAb96750CF9584f70d0f5A920a9457E66FF4#code', title: 'Kaoya Contract' },
    { link: 'https://testnet.bscscan.com/address/0xCc7419E654bca0A5Ad1D8B1a1D1A553D6c02e249#code', title: 'MasterChef Contract' },
    { link: 'https://docs.sashimi.cool', title: 'Docs' },
    { link: 'https://sashimi.cool/files/sashimi_audit_report.pdf', title: 'Audit Report' },
    { link: 'https://sashimi.cool/api/farms/getList', title: 'APY API' }
  ]
  return (
    <Container bgimage={footerBg}>
      <InnerContainer>
        <LogoWrapper>
          <img src={logo} />
        </LogoWrapper>
        <MenuWrapper>
          {linkList.map((item, i) => (
            <MenuLink href={item.link} key={i}>
              {item.title}
            </MenuLink>
          ))}
        </MenuWrapper>
        <Divider />
        <FooterWrapper>
          <CopyWriter>© Copyright 2022 - Kaoyaswap</CopyWriter>
          <SocialList>
            <a href='https://discord.com/invite/mSEc2uv'><img src='/images/discord.png' /></a>
            <a href='https://t.me/joinchat/KABj-Bz6CVzyi23HK2rjzA'><img src='/images/instagram.png' /></a>
            <a href='https://twitter.com/SASHIMISASHIMI5'><img src='/images/twitter.png' /></a>
            <a href='https://github.com/SashimiProject/sashimiswap'><img src='/images/github.png' /></a>
          </SocialList>
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
