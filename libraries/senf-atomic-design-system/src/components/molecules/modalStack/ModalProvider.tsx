import React, { useMemo, useEffect, useState, useContext } from 'react'
import ModalStack from "./ModalStack";
import Background from "./Background";

import { ModalProps, ModalStackValue } from "./ModalWrapper.types";


export interface ModalStackProps {
  renderModals?: React.ComponentType<ModalStackValue>
  children?: React.ReactNode
}


const ModalStackContext = React.createContext<ModalStackValue>({} as any)


const Modals = ({ stack, closeModal }: ModalStackValue) => {

  return (
    <>
      <ModalStack stack={stack} closeModal={closeModal} />
      <Background stack={stack} closeModal={closeModal} />
    </>
  )
}


const ModalProvider = ({
  children,
  renderModals: ModalsComponent = Modals,
}: ModalStackProps) => {
  const [stack, setStack] = useState<ModalProps[]>([])

  const value = useMemo<ModalStackValue>(() => {
    const pop = (amount = 1) => {
      setStack((prev) => [...prev].slice(0, prev.length - amount))
    }

    const dismissAll = () => {
      setStack([])
    }

    const dismiss = (amount?: number) => {
      if (stack.length === 1) {
        dismissAll()
      } else {
        pop(amount)
      }
    }

    const openModal = async ({ type, props }, options, reset) => {
      if (reset) dismissAll()
      const modal = { type, props, options }
      const { beforeOpen, afterOpen } = options || {}
      try {
        await beforeOpen?.()
        setStack((prev) => {
          let newStack = [...prev]
          if (options?.replace) newStack = stack.slice(0, stack.length - 1)
          return [...newStack, modal as ModalProps]
        })
        afterOpen?.()
      } catch (error) {
        console.error(error)
      }
    }


    return {
      stack,
      setModal: ({ type, props }, options) => openModal({ type, props }, options, true),
      openModal,
      closeModal: async () => {
        const { beforeClose, afterClose } = stack[stack.length - 1]?.options || {}
        try {
          await beforeClose?.()
          dismiss(1)
          afterClose?.()
        } catch (error) {
          console.error(error)
        }
      },
      closeModals: dismiss,
      closeAllModals: dismissAll,
    }

  }, [stack])

  return (
    <ModalStackContext.Provider value={value}>
      {children}
      <ModalsComponent {...value} />
    </ModalStackContext.Provider>
  )
}


export const useModals = () => useContext(ModalStackContext)
export default ModalProvider
