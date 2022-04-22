import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getBalance } from '../utils/erc20'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useTokenBalance = (tokenAddress: string, accountInput?: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    library,
  } = useActiveWeb3React()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(library.provider as provider, tokenAddress, accountInput || account)
    setBalance(new BigNumber(balance))
  }, [account, library, tokenAddress, accountInput])

  useEffect(() => {
    if (account && library) {
      fetchBalance()
    }
  }, [account, library, setBalance, block, tokenAddress])

  return balance
}

export default useTokenBalance
