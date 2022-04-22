import { Currency, HT, Token } from '@sashimiswap/sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../LogoL'

const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)
  // console.log(currency)

  const srcs: string[] = useMemo(() => {
    if (currency === HT) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, currency.tokenInfo.logoURI]
      }

      if(currency.symbol === "KY") {
        return ["https://gateway.pinata.cloud/ipfs/QmTmAa8XufTwLmtNHUgoGW6d7gQLXzt53VigFDFbRBf9oF"]
      } else if(currency.symbol === "WBNB") {
        return ["https://gateway.pinata.cloud/ipfs/QmR4RLYaPkUPXNwXQ6Gu37d7x8NhReoA2qisVKUmE7SXAW"]
      } else if(currency.symbol === "BUSD") {
        return ["https://bscscan.com/token/images/busd_32.png"]
      }
      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === HT) {
    return <StyledEthereumLogo src={process.env.REACT_APP_NATIVE_TOKEN_LOGO_URL} size={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
