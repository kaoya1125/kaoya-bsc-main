import React, { useContext } from 'react'
import styled from 'styled-components'
import {
  Button,
  Dropdown,
  Menu
} from 'antd';
import MenuOutlined from '@ant-design/icons/MenuOutlined'
import DownOutlined from '@ant-design/icons/DownOutlined';
import {
  If,
  Else,
  Then
} from 'react-if'
import { NavLink } from 'react-router-dom'
import {
  ExternalLink
} from '../../theme'
import { Context } from '../../contexts/Mobile'
import './index.less'

const trigger:('click' | 'hover' | 'contextMenu')[] = ['click'];

interface Link {
  link: string,
  text?: string,
  isExternal?: boolean,
  target?: string,
  isMobile?: boolean
}

const links:Link[] = [
  {
    link: '/',
    text: 'Home',
  },
  {
    link: '/farms',
    text: 'Farms',
  },
  {
    link: '/swap',
    text: 'Exchanges',
  },
  {
    link: '/staking',
    text: 'Staking',
  },
  {
    link: '/airdrop',
    text: 'Airdrop',
  },
  {
    link: 'https://info.sashimi.cool/',
    text: 'Doc↗',
    isExternal: true,
    target: '_blank'
  },
];

// const chains = [
//   {
//     link: 'https://heco.sashimi.cool/',
//     text: 'Heco',
//     linkTarget: '_self',
//   },
//   {
//     link: 'https://bsc.sashimi.cool/',
//     text: 'BSC',
//     linkTarget: '_self',
//   }
// ];
// const chainSelect = () => (
//   <Menu>
//     {
//       chains.map(item => (
//         <Menu.Item key={item.link}>
//           <StyledExternalLink href={item.link} target={item.linkTarget || '_blank'}>
//             {item.text}
//           </StyledExternalLink>
//         </Menu.Item>
//       ))
//     }
//   </Menu>
// );

const OverLay = () => {
  return (
    <Menu>
      {
        links.map((v, i) => (
          <>
            {i === 0 ? null : <Menu.Divider />}
            <Menu.Item key={v.text}>
              {
                v.isExternal ? (
                  <ExternalLink href={v.link} target={v.target || '_self'}>{v.text}</ExternalLink>
                ) : (
                  <StyledLink exact activeClassName="active" to={v.link}>{v.text}</StyledLink>
                )
              }
            </Menu.Item>
          </>
        ))
      }
    </Menu>
  );
}

const StyledButton = styled(Button)`
  background: ${props => props.theme.bg6};
  border-color: ${props => props.theme.bg6};
`

const Nav: React.FC = () => {
  const {
    isMobile
  } = useContext(Context)
  return (
    <If condition={isMobile}>
      <Then>
        <Dropdown trigger={trigger} overlay={OverLay}>
          <StyledButton
            type="primary"
            icon={<MenuOutlined />}
          />
        </Dropdown>
      </Then>
      <Else>
        <StyledNav>
          {
            links.map(v => v.isMobile ? null : (v.isExternal ? (
              <StyledExternalLink key={v.text} href={v.link} target={v.target || '_self'}>{v.text}</StyledExternalLink>
            ) : (
              <StyledLink
                exact
                activeClassName="active"
                to={v.link}
                key={v.text}
              >
                {v.text}
              </StyledLink>
            )))
          }
          {/* <Dropdown overlay={chainSelect}>
            <Button style={{position:"absolute",right:"0",backgroundColor:"transparent",color:"white"}}>
              Ethereum <DownOutlined />
            </Button>
          </Dropdown> */}
        </StyledNav>
      </Else>
    </If>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  font-weight: 700;
  padding: 0 16px;
  text-decoration: none;
  color: #eee;
  @media (max-width: 414px) {
    padding:0 12px;
  }
`

const StyledExternalLink = styled(ExternalLink)`
  font-weight: 700;
  padding: 0 16px;
  text-decoration: none;
  color: #eee;
  @media (max-width: 414px) {
    padding:0 12px;
  }
`

export default Nav
