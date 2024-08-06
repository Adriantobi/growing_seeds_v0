import EntryWrapper from "./entry-wrapper";
import { SideModal } from "./ui/modals/side-modal";

interface CreateTransactionProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTransaction({ isOpen, onClose }: CreateTransactionProps) {
  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      header="Create Transaction"
      subheader="Add a new transaction to the system"
    >
      <div className="flex flex-col h-full justify-between overflow-y-auto gap-8 no-scrollbar">
        <EntryWrapper />
      </div>
    </SideModal>
  );
}
