import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useEffect, useRef } from "react";
import { XIcon } from "lucide-react";
import { BigButton } from "../buttons/big-button";
import { getCsrfToken } from "next-auth/react";

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  subheader?: string;
  endPoint?: string;
  children?: React.ReactNode;
}

export function SideModal({
  isOpen,
  onClose,
  header,
  subheader,
  endPoint,
  children,
}: SideModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (isOpen) {
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  async function handleSubmit() {
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);

    if (!endPoint) {
      return;
    }
    const csrfToken = await getCsrfToken();
    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${csrfToken}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.status === 200) {
      onClose();
    } else {
      console.error(res.error);
    }
  }

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
            className="absolute right-10 w-[468px] h-[calc(100%-20px)] rounded-tl-lg rounded-tr-lg bg-[#121212] flex flex-col"
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
            <form
              ref={formRef}
              className="px-6 flex flex-col gap-2 h-full overflow-y-auto"
            >
              {children}
            </form>
            <div className="flex gap-2 p-4 justify-end border-t border-t-zinc-800">
              <BigButton onClick={onClose} position="center">
                Cancel
              </BigButton>
              <BigButton
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-700"
                position="center"
                type="submit"
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
