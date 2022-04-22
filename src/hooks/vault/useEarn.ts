import {Contract} from "web3-eth-contract";
import {provider} from "web3-core";
import {useWallet} from "use-wallet";
import {useCallback} from "react";
import { useActiveWeb3React } from "..";

const useEarn = (vaultContract: Contract) => {
  const { account, library } = useActiveWeb3React();

  const handleEarn = useCallback(async () => {
    try {
      return await vaultContract.methods
        .earn()
        .send({ from: account });
    } catch (e) {
      return false
    }
  }, [account, library, vaultContract]);

  return { onEarn: handleEarn }
}

export default useEarn;
