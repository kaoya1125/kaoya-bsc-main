import { useCallback, useEffect, useState } from 'react'

import useYam from './useYam'
import { useActiveWeb3React } from '.'

import { checkAirdrop, harvestBusd, getMasterChefContract } from '../sushi/utils'
import { Contract } from 'web3-eth-contract'
import { isUndefined } from 'lodash'

const useCheckAirdrop = (contract: Contract, depositTime: any | undefined) => {
  const { account } = useActiveWeb3React()
  const [airDrop, setAirdrop] = useState(false)

  const fetchCheckAirdrop = useCallback(async () => {
    if(isUndefined(depositTime) || depositTime == 0) {
      setAirdrop(false)
    } else {
      const txHash = await checkAirdrop(contract, depositTime)
      setAirdrop(txHash)
    }
  }, [account, contract, depositTime])

  useEffect(() => {
    if (account) {
      fetchCheckAirdrop()
    }
  }, [account, contract, depositTime])
  return airDrop;
}

export default useCheckAirdrop
