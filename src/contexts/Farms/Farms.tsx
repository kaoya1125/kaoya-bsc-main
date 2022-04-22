import React, { useState } from 'react'
import useYam from '../../hooks/useYam'
import { getFarms } from '../../sushi/utils'

import Context from './context'

const Farms: React.FC = ({ children }) => {
  const [unharvested] = useState(0)

  const yam = useYam()

  const farms = getFarms(yam)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
