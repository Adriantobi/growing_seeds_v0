import { BigButton } from "./buttons/big-button";
import EntryWrapper from "./entry-wrapper";
import OptionInput from "./input/option-input";
import { SideModal } from "./modals/side-modal";

interface DetailTransactionProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DetailTransaction({ isOpen, onClose }: DetailTransactionProps) {
  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      header="Detail Transaction"
      subheader="Manage transaction details here"
    >
      <div className="flex flex-col h-full justify-between overflow-y-auto gap-8 no-scrollbar">
        <EntryWrapper />
      </div>
    </SideModal>
  );
}
