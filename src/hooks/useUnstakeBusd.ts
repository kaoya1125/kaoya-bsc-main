import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import useYam from './useYam'
import { useActiveWeb3React } from '.'

import { unstakeBusd, getMasterChefContract } from '../sushi/utils'

const useUnstakeBusd = (stake: any, targetContract?: Contract) => {
  const { account } = useActiveWeb3React()
  const yam = useYam()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstakeBusd(targetContract, amount, account, stake)
      console.log(txHash)
    },
    [account, yam, stake, targetContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeBusd
