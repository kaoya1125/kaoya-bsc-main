import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useYam from './useYam'
import { useActiveWeb3React } from '../hooks'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getMasterChefContract } from '../sushi/utils'

const useAllowance = (lpContract: Contract, targetContract?: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useActiveWeb3React()
  const yam = useYam()
  const masterChefContract = targetContract || getMasterChefContract(yam)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      masterChefContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, masterChefContract, lpContract])

  useEffect(() => {
    if (account && masterChefContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, masterChefContract, lpContract])

  return allowance
}

export default useAllowance
