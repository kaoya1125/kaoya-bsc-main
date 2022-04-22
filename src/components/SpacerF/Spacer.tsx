import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

interface SpacerProps {
  size?: 'sm' | 'md' | 'lg'
}

const Spacer: React.FC<SpacerProps> = ({ size = 'md' }) => {
  const theme = useContext(ThemeContext)
  
  let s: number
  switch (size) {
    case 'lg':
      s = theme.spacing[6]
      break
    case 'sm':
      s = theme.spacing[2]
      break
    case 'md':
    default:
      s = theme.spacing[4]
  }
  
  return (
    <StyledSpacer size={s} />
  )
}

interface StyledSpacerProps {
  size: number,
}

const StyledSpacer = styled.div<StyledSpacerProps>`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`

export default Spacer