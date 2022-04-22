import { useCallback } from 'react'

import useYam from './useYam'
import { useActiveWeb3React } from '../hooks'

import { unstake, getMasterChefContract } from '../sushi/utils'

const useUnstake = (pid: number) => {
  const { account } = useActiveWeb3React()
  const yam = useYam()
  const masterChefContract = getMasterChefContract(yam)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, yam],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
