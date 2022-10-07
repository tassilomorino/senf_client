import { ModalProps } from "../../../molecules/modalStack/ModalStack.types";

export interface DiscardModalContentProps {
  header: string;
  closeModal: () => Promise<ModalProps[]>;
  setDiscard: React.Dispatch<React.SetStateAction<boolean>>;
}
