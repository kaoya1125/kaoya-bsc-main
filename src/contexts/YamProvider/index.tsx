import React, { createContext, useMemo, useState } from 'react'
import { useActiveWeb3React } from '../../hooks'
import { Yam } from '../../sushi'

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

const YamProvider: React.FC = ({ children }) => {
  const { account, library, chainId } = useActiveWeb3React()

  // @ts-ignore
  window.eth = library.provider

  const yam: any = useMemo(() => {
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

  return <Context.Provider value={{yam}}>{children}</Context.Provider>
}

export default YamProvider
