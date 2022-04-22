import React from 'react'
import styled from 'styled-components'

const Card: React.FC<{
  className?: string
}> = ({ children, className }) => (
  <StyledCard className={className}>
    {children}
  </StyledCard>
)

const StyledCard = styled.div`
  box-shadow: none;
  display: flex;
  flex: 1;
  flex-direction: column;
  z-index: 1;
`

export default Card
