import {Contract} from "web3-eth-contract";
import {provider} from "web3-core";
import {useWallet} from "use-wallet";
import {useCallback} from "react";
import { useActiveWeb3React } from "..";

const useHarvest = (strategyContract: Contract) => {
  const { account, library } = useActiveWeb3React();

  const handleHarvest = useCallback(async () => {
    try {
      return await strategyContract.methods
        .harvest()
        .send({ from: account });
    } catch (e) {
      return false
    }
  }, [account, library, strategyContract]);

  return { onHarvest: handleHarvest }
}

export default useHarvest;
