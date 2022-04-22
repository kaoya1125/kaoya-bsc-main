import { useCallback, useEffect, useState } from 'react'

import useYam from './useYam'
import { useActiveWeb3React } from '.'

import { getUserInfo, harvestBusd, getMasterChefContract } from '../sushi/utils'
import { Contract } from 'web3-eth-contract'

const useUserInfo = (contract: Contract) => {
  const { account } = useActiveWeb3React()
  const [userInfo, setUserInfo]: any = useState([])

  const fetchUserInfo = useCallback(async () => {
    const txHash = await getUserInfo(contract, account)
    setUserInfo(txHash)
  }, [account])

  useEffect(() => {
    if (account) {
      fetchUserInfo()
    }
  }, [account, contract])

  return userInfo;
}

export default useUserInfo
