import { useCallback } from 'react'

import useYam from './useYam'
import { useActiveWeb3React } from '../hooks'

import { harvest, harvestBusd, getMasterChefContract } from '../sushi/utils'

const useReward = (pid: number) => {
  const { account } = useActiveWeb3React()
  const yam = useYam()
  const masterChefContract = getMasterChefContract(yam)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, yam])

  return { onReward: handleReward }
}

export const useRewardBusd = (busdStakingContract) => {
  const { account } = useActiveWeb3React()
  const yam = useYam()

  const handleReward = useCallback(async () => {
    const txHash = await harvestBusd(busdStakingContract, account)
    console.log(txHash)
    return txHash
  }, [account, yam, busdStakingContract])

  return { onReward: handleReward }
}

export default useReward
