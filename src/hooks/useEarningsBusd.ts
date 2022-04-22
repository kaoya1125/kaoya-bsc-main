import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useActiveWeb3React } from '.'

import { getEarnedBusd, getMasterChefContract } from '../sushi/utils'
import useYam from './useYam'
import useBlock from './useBlock'
import { Contract } from 'web3-eth-contract'

const useEarningsBusd = (busdStakingContract: Contract) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account
  } = useActiveWeb3React()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarnedBusd(busdStakingContract, account)
    setBalance(new BigNumber(balance))
  }, [account, busdStakingContract])

  useEffect(() => {
    if (account && busdStakingContract) {
      fetchBalance()
    }
  }, [account, block, busdStakingContract, setBalance])
  
  return balance
}

export default useEarningsBusd
