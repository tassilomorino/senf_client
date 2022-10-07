export interface DiscardModalContentProps {
  header: string;
  closeModal: () => void;
  setDiscard: React.Dispatch<React.SetStateAction<boolean>>;
}
