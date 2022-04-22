import React, { useCallback, useMemo, useState } from 'react'
import {
  Button
} from 'antd';

import BigNumber from 'bignumber.js'
import Modal from '../Modal'
import ModalActions from '../ModalActionsF'
import ModalTitle from '../ModalTitleF'
import TokenInput from '../TokenInputF'
import {
  getFullDisplayBalance,
} from '../../utils/formatBalance'
import { getDecimalByTokenName } from "../../sushi/utils";
import styled from 'styled-components'

export interface DepositModalProps {
  isOpen: boolean
  onDismiss: () => void
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
  modalTitle?: string
}

export default function DepositModalBusd({
  isOpen,
  onDismiss,
  max,
  onConfirm,
  tokenName = '',
  modalTitle = ''
}) {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const decimal = 18;

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, decimal)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} minHeight={40}>
      <ModalTitle text={modalTitle || `Deposit ${tokenName} Tokens`} />
      <Separator />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <StyledButton
          onClick={onDismiss}
        >
          <span>Cancel</span>
        </StyledButton>
        <Button
          disabled={pendingTx}
          type="primary"
          size="large"
          block
          style={{ background: 'linear-gradient(87.67deg, #F6881E 0%, #EF2E24 100%)', borderRadius: '6px' }}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            if (onDismiss != undefined)
              onDismiss()
          }}
        >
          {pendingTx ? 'Pending Confirmation' : 'Confirm'}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg2};
`

const StyledButton = styled.button`
    background: none;
    border: none;
    height: 40px;
    width: 100%;
    cursor: pointer;
    background-image: radial-gradient(circle at 100% 100%, transparent 5px, #f6881e 5px, #f6881e 6px, transparent 6px), linear-gradient(to right, #f6881e, #ef2e24), radial-gradient(circle at 0% 100%, transparent 5px, #ef2e24 5px, #ef2e24 6px, transparent 6px), linear-gradient(to bottom, #ef2e24, #ef2e24), radial-gradient(circle at 0% 0%, transparent 5px, #ef2e24 5px, #ef2e24 6px, transparent 6px), linear-gradient(to left, #ef2e24, #ec881e), radial-gradient(circle at 100% 0%, transparent 5px, #ec881e 5px, #ec881e 6px, transparent 6px), linear-gradient(to top, #ec881e, #f6881e);
    background-size: 6px 6px, calc(100% - 12px) 1px, 6px 6px, 1px calc(100% - 12px);
    background-position: top left,top center,top right,center right, bottom right,bottom center,bottom left,center left;
    background-repeat: no-repeat;
    border-radius: 6px;
    >span {
        font-family: Poppins;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        background: linear-gradient(87.67deg, #F6881E 0%, #EF2E24 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }
`