import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { useActiveWeb3React } from '.'
import { getAirdrop } from '../sushi/utils'

const useBnbAirdrop = (masterChefContract: Contract) => {
  const { account } = useActiveWeb3React()

  const handleGetAirdrop = useCallback(async () => {
    const txHash = await getAirdrop(masterChefContract, account)
    return txHash
  }, [account, masterChefContract])

  return { onBnbAirdrop: handleGetAirdrop }
}

export const useBusdAirdrop = (masterChefContract: Contract) => {
  const { account } = useActiveWeb3React()

  const handleGetAirdrop = useCallback(async () => {
    const txHash = await getAirdrop(masterChefContract, account)
    return txHash
  }, [account, masterChefContract])

  return { onBusdAirdrop: handleGetAirdrop }
}

export default useBnbAirdrop
