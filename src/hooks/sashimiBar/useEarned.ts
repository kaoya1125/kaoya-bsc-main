import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import useBlock from '../useBlock'
import { useActiveWeb3React } from '..'

const useEarned = (lpBarContract: Contract, isEarnedFromChef = false): BigNumber => {
  const [earnings, setEarnings] = useState(new BigNumber(0));
  const {
    account,
    library,
  } = useActiveWeb3React();
  const block = useBlock();

  const fetchEarned = useCallback(async () => {
    if (lpBarContract) {
      // const result = isEarnedFromChef ? await lpBarContract.methods.earnedFromChef(account).call() : await lpBarContract.methods.earned(account).call();
      const result = isEarnedFromChef ? await lpBarContract.methods.earnedFromChef(account).call() : await lpBarContract.methods.earned(account).call();
      setEarnings(new BigNumber(result));
    }
  }, [account, library, lpBarContract, block]);

  useEffect(() => {
    if (account && library) {
      fetchEarned()
    }
  }, [fetchEarned]);

  return earnings;
};

export default useEarned;
