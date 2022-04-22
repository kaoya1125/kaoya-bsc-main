import React from 'react'
import styled from 'styled-components'

interface ModalTitleProps {
  text?: string
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
  <StyledModalTitle>
    {text}
  </StyledModalTitle>
)

const StyledModalTitle = styled.div`
  font-family: Poppins;
  align-items: center;
  color: ${({theme}) => theme.grey[600]};
  display: flex;
  font-size: 32px;
  font-weight: 700;
  height: 115px;
  color: #121127;
  padding: 1rem;
`

export default ModalTitle