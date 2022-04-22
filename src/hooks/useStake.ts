import { useCallback } from 'react'

import useYam from './useYam'
import { useActiveWeb3React } from '../hooks'

import { stake, getMasterChefContract } from '../sushi/utils'

const useStake = (pid: number) => {
  const { account } = useActiveWeb3React()
  const yam = useYam()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(yam),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, yam],
  )

  return { onStake: handleStake }
}

export default useStake
