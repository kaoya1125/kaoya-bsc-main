import React from 'react'
import styled from 'styled-components'

const CardContent: React.FC = ({ children }) => (
  <StyledCardContent>{children}</StyledCardContent>
)

const StyledCardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  backdrop-filter: blur(168.8px);
  border-radius: 12px;
  padding: ${props => props.theme.spacing[3]}px;
`

export default CardContent
