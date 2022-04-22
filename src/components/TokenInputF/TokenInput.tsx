import React from 'react'
import styled from 'styled-components'
import {
  Button
} from 'antd';

import Input, { InputProps } from '../InputF'

interface TokenInputProps extends InputProps {
  max: number | string,
  symbol: string,
  value: string,
  onSelectMax?: () => void,
}

const TokenInput: React.FC<TokenInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
}) => {
  return (
    <StyledTokenInput>
      <StyledMaxText>{max.toLocaleString()} {symbol} Available</StyledMaxText>
      <Input
        startAdornment={(
          <StyledTokenAdornmentWrapper>
            <div>
              <Button onClick={onSelectMax} style={{ background: '#ECECEC', borderRadius: '8px' }}>Max</Button>
            </div>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
          </StyledTokenAdornmentWrapper>
        )}
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div`
  padding: 1rem;
  input {
    text-align: right;
    font-family: Poppins;
    font-weight: 400;
    font-size: 20px;
    line-height: 180%;
    color: #121127;
  }
`

const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
  font-family: 'Poppins';
  font-size: 20px;
  line-height: 180%;
  color: #121127;
  button {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
  button span {
    font-family: 'Poppins';
    font-size: 20px;
    line-height: 180%;
    color: #121127;
  }
`

const StyledMaxText = styled.div`
  align-items: center;
  color: #121127;
  display: flex;
  font-size: 20px;
  line-height: 140%;
  font-weight: 700;
  height: 44px;
  justify-content: flex-start;
  font-family: Poppins;
  margin-top: 40px;
  margin-bottom: 10px;
`

const StyledTokenSymbol = styled.span`
  color: ${({theme}) => theme.grey[600]};
  font-weight: 700;
`

export default TokenInput
