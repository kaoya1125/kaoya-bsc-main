import { useContext, createContext, useMemo } from 'react'
// import { Context } from '../contexts/YamProvider'
import { useActiveWeb3React } from '../hooks'
import { Yam } from '../sushi'

export interface YamContext {
  yam?: typeof Yam
}

export const Context = createContext<YamContext>({
  yam: undefined,
})

declare global {
  interface Window {
    yamsauce: any
  }
}

const useYam = () => {
  const { account, library, chainId } = useActiveWeb3React()

  // @ts-ignore
  window.eth = library.provider

  const value: any = useMemo(() => {
    if (library) {
      const yamLib = new Yam(library.provider, chainId, false, {
        defaultAccount: account,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      // @ts-ignore
      window.yam = yamLib
      window.yamsauce = yamLib
      return yamLib
    }
  }, [library])
  return value
}

export default useYam