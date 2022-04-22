import {Contract} from "web3-eth-contract";
import {useCallback, useEffect, useState} from "react";
import BigNumber from "bignumber.js";
import useBlock from "../useBlock";
import {provider} from "web3-core";
import {useWallet} from "use-wallet";
import {getVaultTotalBalance} from "../../utils/vault";
import { useActiveWeb3React } from "..";

export const useVaultTotalBalance = (vaultContract: Contract) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const block = useBlock();
  const {
    account,
    library,
  } = useActiveWeb3React();

  const fetchBalance = useCallback(async () => {
    const balance = await getVaultTotalBalance(vaultContract, account);
    setBalance(new BigNumber(balance))
  }, [vaultContract, account]);

  useEffect(() => {
    if (account && library) {
      fetchBalance()
    }
  }, [fetchBalance, block]);

  return balance
};
