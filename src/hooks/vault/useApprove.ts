import {Contract} from "web3-eth-contract";
import {provider} from "web3-core";
import {useWallet} from "use-wallet";
import {useCallback} from "react";
import {ethers} from "ethers";
import { useActiveWeb3React } from "..";

const useApprove = (tokenContract: Contract, targetAddress: string) => {
  const { account } = useActiveWeb3React();

  const handleApprove = useCallback(async () => {
    try {
      return await tokenContract.methods
        .approve(targetAddress, ethers.constants.MaxUint256)
        .send({ from: account });
    } catch (e) {
      return false
    }
  }, [account, tokenContract, targetAddress]);

  return { onApprove: handleApprove }
}

export default useApprove;
