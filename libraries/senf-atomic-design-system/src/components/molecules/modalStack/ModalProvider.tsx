/**
 * Inspired by React Modal Stack
 * Author: Matt Jennings
 * npm: @mattjennings/react-modal-stack
 * github: https://github.com/mattjennings/react-modal-stack
 * License: MIT
 */

import React, { useMemo, useState, useContext } from "react";
import styled from "styled-components";
import ModalStack from "./ModalStack";
import Background from "./Background";

import { ModalProps, ModalStackValue, ModalOptions } from "./ModalStack.types";

export interface ModalStackProps {
  renderModals?: React.ComponentType<ModalStackValue>;
  children?: React.ReactNode;
}

const ModalStackContext = React.createContext({} as ModalStackValue);

const ModalStackWrapper = styled.div`
  z-index: 99999;
  position: fixed;
`;
const Modals = ({ stack, closeModal }: ModalStackValue) => {
  return (
    <ModalStackWrapper>
      <ModalStack
        stack={stack}
        closeModal={closeModal}
      />
      <Background
        stack={stack}
        closeModal={closeModal}
      />
    </ModalStackWrapper>
  );
};

const ModalProvider = ({ children }: ModalStackProps) => {
  const [stack, setStack] = useState<ModalProps[]>([]);

  const value = useMemo(() => {
    const pop = (amount = 1) => {
      setStack((prev) => [...prev].slice(0, prev.length - amount));
    };

    const dismissAll = () => {
      setStack([]);
      return stack;
    };

    const dismiss = (amount?: number) => {
      if (stack.length === 1) {
        dismissAll();
      } else {
        pop(amount);
      }
      return stack;
    };

    const openModal = async (
      data: JSX.Element | null,
      options?: ModalOptions,
      reset?: boolean
    ) => {
      const DefaultComponent = () => <div />;
      const { type, props } = data || <DefaultComponent />;
      if (reset) dismissAll();
      const modal = {
        type,
        props: { ...options, ...props },
        options: { ...options, ...props },
      };
      const { beforeOpen, afterOpen } = options || {};
      if (typeof type === undefined) {
        throw new Error("Modal type is undefined");
      }
      try {
        await beforeOpen?.();
        setStack((prev) => {
          let newStack = [...prev];

          if (options?.replace) newStack = stack.slice(0, stack.length - 1);

          return [...newStack, modal as ModalProps];
        });
        afterOpen?.();
        return stack;
      } catch (error) {
        throw new Error(error);
      }
    };

    const closeModal = async () => {
      const { beforeClose, afterClose } =
        stack[stack.length - 1]?.options || {};
      try {
        await beforeClose?.();
        dismiss(1);
        afterClose?.();
        return stack;
      } catch (error) {
        throw new Error("error");
      }
    };

    return {
      stack,
      setModal: (data: JSX.Element, options?: ModalOptions) =>
        openModal(data, options, true),
      openModal,
      closeModal,
      closeModals: dismiss,
      closeAllModals: dismissAll,
    };
  }, [stack]);

  return (
    <ModalStackContext.Provider value={value}>
      {children}
      <Modals {...value} />
    </ModalStackContext.Provider>
  );
};

export const useModals = () => useContext(ModalStackContext);
export default ModalProvider;
