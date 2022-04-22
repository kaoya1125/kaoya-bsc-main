import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { useActiveWeb3React } from '.'

import { redeem } from '../sushi/utils'

const useRedeem = (masterChefContract: Contract) => {
  const { account } = useActiveWeb3React()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(masterChefContract, account)
    console.log(txHash)
    return txHash
  }, [account, masterChefContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
