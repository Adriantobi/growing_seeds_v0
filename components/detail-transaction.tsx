import useUserStore from "@/stores/user-store";
import EntryWrapper from "./entry-wrapper";
import { SideModal } from "./ui/modals/side-modal";

interface DetailTransactionProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Denomination {
  denomination: number;
  quantity: number;
}

export interface Partnership {
  partnership_arm: string;
  amount: number;
  payment_method: string;
  denominations?: Denomination[];
  cheque_number?: string;
  kingspay_number?: string;
}

export interface Offering {
  offering_type: string;
  amount: number;
  payment_method: string;
  denominations?: Denomination[];
  cheque_number?: string;
  kingspay_number?: string;
}

interface JSONOutput {
  name: string;
  partnerships?: Partnership[];
  offerings?: Offering[];
}

function convertFormDataToJSON(formData: FormData): JSONOutput {
  const json: JSONOutput = { name: "", partnerships: [], offerings: [] };

  const formEntries = Array.from(formData.entries());

  if (formEntries.some(([key]) => key === "name")) {
    json.name = formEntries.find(([key]) => key === "name")![1] as string;
  }

  const allKeys = formEntries.filter(
    ([key]) => key.startsWith("offering") || key.startsWith("partnership"),
  );

  function processEntry(key: string, value: string) {
    return {
      amount: (value as string).split("|108|")[1] as unknown as number,
      payment_method: formEntries.find(
        ([k]) => k === `payment_method${key}`,
      )![1] as string,
      denominations: formEntries
        .filter(([k]) => k.startsWith(`denomination${key}`))
        .map(([k, v]) => {
          const denom = (v as string).split("|108|");
          return {
            denomination: Number(denom[0]),
            quantity: Number(denom[1]),
          };
        }) as Denomination[],
      cheque_number: formEntries.filter(
        ([k]) => k === `cheque_number${key}`,
      )[0]?.[1] as string,
      kingspay_number: formEntries.filter(
        ([k]) => k === `kingspay_number${key}`,
      )[0]?.[1] as string,
    };
  }

  if (allKeys.length === 0) {
    return json;
  } else {
    allKeys.forEach(([key, value]) => {
      const type = key.startsWith("partnership") ? "partnership" : "offering";
      key = key.split(type)[1];
      const entry = processEntry(key, value as string);

      if (type === "partnership") {
        json.partnerships!.push({
          ...entry,
          partnership_arm: (value as string).split("|108|")[0],
        } as Partnership);
      } else {
        json.offerings!.push({
          ...entry,
          offering_type: (value as string).split("|108|")[0],
        } as Offering);
      }
    });
  }

  return json;
}

export function DetailTransaction({ isOpen, onClose }: DetailTransactionProps) {
  const { user } = useUserStore();
  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      header="Detail Transaction"
      subheader="Manage transaction details here"
      onSubmit={async (form: HTMLFormElement) => {
        const formData = new FormData(form);
        const data = convertFormDataToJSON(formData);

        const response = await fetch("/api/create/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user?.authToken}`,
          },
          body: JSON.stringify({
            ...data,
            member_id: "clzo6bpq70003o90o6fsm0k8j",
          }),
        });
        const res = await response.json();
        if (response.ok) {
          onClose();
        } else {
          console.error(res.error);
        }
      }}
    >
      <div className="flex flex-col h-full justify-between overflow-y-auto gap-8 no-scrollbar">
        <EntryWrapper />
      </div>
    </SideModal>
  );
}
