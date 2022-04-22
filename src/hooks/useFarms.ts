import { createContext, useState } from 'react'
import useYam from '../hooks/useYam'
import { getFarms } from '../sushi/utils'
import { Contract } from 'web3-eth-contract'
// import { FarmsContext } from '../contexts/Farms'

// export const Context = createContext<FarmsContext>({
//   farms: [],
//   unharvested: 0,
// })
export interface SashimiPlateInfo {
  mainTokenIndex?: number
  tokensDecimal?: number[]
  type: number
}
export interface Farm {
  pid: number
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  icon: React.ReactNode
  id: string
  tokenSymbol: string
  lpBarAddress?: string
  lpBarContract?: Contract
  isSashimiPlate?: boolean
  sashimiPlateInfo?: SashimiPlateInfo
  sashimiPlateContract?: Contract
  uniV2LPAddress?: string
  uniV2LPContract?: Contract
}

export interface FarmsContext {
  farms: Farm[]
  unharvested: number
}
const useFarms = () => {
  const yam = useYam()
  const farms: FarmsContext["farms"] = getFarms(yam)
  return [farms]
}

export const useFarm = (id: string): Farm => {
  const yam = useYam()
  const farms: FarmsContext["farms"] = getFarms(yam)
  const farm = farms.find(farm => farm.id === id)
  return farm!
}

export default useFarms