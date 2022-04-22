import { useCallback, useContext, createContext } from 'react'

// import { Context } from '../contexts/Modals'

interface ModalsContext {
  content?: React.ReactNode,
  isOpen?: boolean,
  onPresent: (content: React.ReactNode, key?: string) => void,
  onDismiss: () => void
}

export const Context = createContext<ModalsContext>({
  onPresent: () => {},
  onDismiss: () => {},
})

const useModal = (modal: React.ReactNode, key?: string) => {
  const { onDismiss, onPresent } = useContext(Context)

  const handlePresent = useCallback(() => {
    onPresent(modal, key)
  }, [
    key,
    modal,
    onPresent,
  ])
  return [handlePresent, onDismiss]
}

export default useModal