export interface DiscardModalProps {
  header: string;
  closeModal: () => void;
  setDiscard: React.Dispatch<React.SetStateAction<boolean>>;
}
