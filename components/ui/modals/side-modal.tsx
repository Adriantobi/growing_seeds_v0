import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useEffect } from "react";
import { XIcon } from "lucide-react";
import { BigButton } from "../buttons/big-button";

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  subheader?: string;
  children?: React.ReactNode;
}

export function SideModal({
  isOpen,
  onClose,
  header,
  subheader,
  children,
}: SideModalProps) {
  useEffect(() => {
    if (isOpen) {
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
          onClick={() => onClose()}
        >
          <motion.div
            initial={{ y: "20px" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="absolute right-10 w-[468px] h-[calc(100%-20px)] rounded-tl-lg rounded-tr-lg bg-[#121212] flex flex-col justify-between"
            onClick={(e: MouseEvent) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-b-zinc-800 px-6 py-4">
              <span>
                <h2 className="text-lg font-semibold">{header}</h2>
                <p className="text-sm text-zinc-500">{subheader}</p>
              </span>
              <XIcon
                className="cursor-pointer"
                size={16}
                onClick={() => onClose()}
              />
            </div>
            <div className="px-6 flex flex-col gap-2 h-full overflow-y-auto">
              {children}
            </div>
            <div className="flex gap-2 p-4 justify-end border-t border-t-zinc-800">
              <BigButton onClick={onClose} position="center">
                Cancel
              </BigButton>
              <BigButton
                onClick={onClose}
                className="bg-green-500 hover:bg-green-700"
                position="center"
              >
                Save
              </BigButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
