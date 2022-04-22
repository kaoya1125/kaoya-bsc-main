import { useCallback } from 'react'

import useYam from './useYam'
import { useActiveWeb3React } from '../hooks'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getMasterChefContract } from '../sushi/utils'

const useApprove = (lpContract: Contract, targetContract?: Contract) => {
  const { account } = useActiveWeb3React()
  const yam = useYam()
  const masterChefContract = targetContract || getMasterChefContract(yam)

  const handleApprove = useCallback(async () => {
    console.log(lpContract)
    console.log(masterChefContract)
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export default useApprove
