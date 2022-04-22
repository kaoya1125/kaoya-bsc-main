import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getStakedBusd, getMasterChefContract } from '../sushi/utils'
import useYam from './useYam'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } = useActiveWeb3React()
  const yam = useYam()
  const masterChefContract = getMasterChefContract(yam)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, yam])

  useEffect(() => {
    if (account && yam) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, yam])

  return balance
}

export const useStakedBusdBalance = (busdStakingContract) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } = useActiveWeb3React()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStakedBusd(busdStakingContract, account)
    setBalance(new BigNumber(balance))
  }, [account, busdStakingContract])

  useEffect(() => {
    if (account) {
      fetchBalance()
    }
  }, [account, setBalance, block, busdStakingContract])

  return balance
}

export default useStakedBalance
