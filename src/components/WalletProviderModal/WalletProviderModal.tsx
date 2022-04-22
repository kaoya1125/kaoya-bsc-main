import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  Button
} from 'antd';
import { useWallet } from 'use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import Modal, { ModalProps } from '../ModalF'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

import WalletCard from './components/WalletCard'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (account) {
      onDismiss?.()
    }
  }, [account, onDismiss])

  return (
    <Modal>
      <ModalTitle text="Select a wallet provider." />

      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={metamaskLogo} style={{ height: 32 }} />}
              onConnect={() => connect('injected')}
              title="Metamask"
            />
          </StyledWalletCard>
          {/*<Spacer size="sm" />*/}
          {/*<StyledWalletCard>*/}
          {/*  <WalletCard*/}
          {/*    icon={<img src={walletConnectLogo} style={{ height: 24 }} />}*/}
          {/*    onConnect={() => connect('walletconnect')}*/}
          {/*    title="WalletConnect"*/}
          {/*  />*/}
          {/*</StyledWalletCard>*/}
        </StyledWalletsWrapper>
      </ModalContent>

      <ModalActions>
        <Button size="large" block onClick={onDismiss} >Cancel</Button>
      </ModalActions>
    </Modal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 414px) {
    flex-direction: column;
    flex-wrap: none;
  }
`

const StyledWalletCard = styled.div`
  flex-basis: calc(100% - ${(props) => props.theme.spacing[2]}px);
`

export default WalletProviderModal
