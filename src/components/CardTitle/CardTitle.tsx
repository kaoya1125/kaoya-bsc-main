import React from 'react'
import styled from 'styled-components'

interface CardTitleProps {
  text?: string
}

const CardTitle: React.FC<CardTitleProps> = ({ text }) => (
  <StyledCardTitle>{text}</StyledCardTitle>
)

const StyledCardTitle = styled.div`
  color: ${({theme}) => theme.grey[600]};
  font-size: 18px;
  font-weight: 700;
  padding: ${({theme}) => theme.spacing[4]}px;
  text-align: center;
`

export default CardTitle