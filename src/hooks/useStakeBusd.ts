import { useCallback } from 'react'

import useYam from './useYam'
import { useActiveWeb3React } from '.'
import { Contract } from 'web3-eth-contract'
import { stakeBusd, getMasterChefContract } from '../sushi/utils'

const useStakeBusd = (targetContract) => {
  const { account } = useActiveWeb3React()
  const yam = useYam()
  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeBusd(
        targetContract,
        amount,
        account,
      )
    },
    [account, yam, targetContract],
  )

  return { onStake: handleStake }
}

export default useStakeBusd
