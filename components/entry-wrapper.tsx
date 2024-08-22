"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import OptionInput from "./ui/input/option-input";
import Input from "./ui/input/input";
import { BigButton } from "./ui/buttons/big-button";

interface OptionProps {
  title: string;
  setValue: (title: string) => void;
  selected: boolean;
}

interface GivingsProps {
  type: string;
  uniqueId: number;
  remove: (key: number) => void;
}

interface DenominationProps {
  uniqueId: number;
  name: string;
  remove: (key: number) => void;
}

function Option({ title, setValue, selected }: OptionProps) {
  return (
    <div
      className={`px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-800 bg-opacity-50 hover:bg-opacity-70 text-sm  cursor-pointer ${selected ? "bg-opacity-25" : ""}`}
      onClick={() => setValue(title)}
    >
      {title}
    </div>
  );
}

function Denomination({ uniqueId, name, remove }: DenominationProps) {
  return (
    <OptionInput
      uniqueId={uniqueId}
      type="number"
      name={`${name}|108|`}
      currencySymbol="£"
      textPlaceholder="0"
      optionsPlaceholder="Denomination"
      options={[50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01]}
      remove={remove}
    />
  );
}

function Givings({ type, uniqueId, remove }: GivingsProps) {
  const Partnership = (
    <OptionInput
      uniqueId={uniqueId}
      type="currency"
      name="partnership"
      currencySymbol="£"
      textPlaceholder="0"
      optionsPlaceholder="Partnership"
      options={[
        "Rhapsody of Realities",
        "Loveworld TV",
        "Healing School",
        "Innercity Mission",
        "IMM",
        "Missions",
        "Bible Sponsorship",
        "Campus Ministry",
        "Teens Advance Ministry",
      ]}
      remove={remove}
    />
  );
  const Offerings = (
    <OptionInput
      uniqueId={uniqueId}
      type="currency"
      name="offering"
      currencySymbol="£"
      textPlaceholder="0"
      optionsPlaceholder="Offerings"
      options={[
        "Offering",
        "Tithes",
        "Seed Offering",
        "First Fruit",
        "Thanksgiving",
      ]}
      remove={remove}
    />
  );
  const [payment, setPayment] = useState("");
  const [denominationList, setDenominationList] = useState<{ key: number }[]>(
    [],
  );

  const handleAddDenomination = () => {
    const newKey =
      denominationList.length > 0
        ? Math.max(...denominationList.map((d: { key: number }) => d.key)) + 1
        : 0;
    const newDenomination: { key: number } = {
      key: newKey,
    };
    setDenominationList([...denominationList, newDenomination]);
  };

  const handleRemoveDenomination = (key: number) => {
    setDenominationList(
      denominationList.filter((denomination) => denomination.key !== key),
    );
  };

  return (
    <span className="flex flex-col gap-4">
      {type === "partnership" ? Partnership : null}
      {type === "offerings" ? Offerings : null}
      <span className="flex gap-4 flex-wrap">
        <Option
          title="Cheque"
          setValue={setPayment}
          selected={payment === "Cheque"}
        />

        <Option
          title="Bank Transfer"
          setValue={setPayment}
          selected={payment === "Bank Transfer"}
        />
        <Option
          title="KingsPay"
          setValue={setPayment}
          selected={payment === "KingsPay"}
        />
        <Option
          title="Cash"
          setValue={setPayment}
          selected={payment === "Cash"}
        />
      </span>
      <input
        className="hidden"
        name={`payment_method${uniqueId}`}
        value={payment}
      />
      {payment === "Cash" ? (
        <>
          {denominationList.map((denomination) => (
            <Denomination
              key={denomination.key}
              name={`denomination${uniqueId}`}
              uniqueId={denomination.key}
              remove={handleRemoveDenomination}
            />
          ))}

          <BigButton onClick={() => handleAddDenomination()} type="button">
            <PlusIcon width={20} height={20} strokeWidth={1.5} /> Add
            Denomination
          </BigButton>
        </>
      ) : null}
      {payment === "KingsPay" ? (
        <Input
          type="text"
          name={`kingspay_number${uniqueId}`}
          placeholder="Reference Code"
        />
      ) : null}
      {payment === "Cheque" ? (
        <Input
          type="text"
          name={`cheque_number${uniqueId}`}
          placeholder="Cheque Number"
        />
      ) : null}
    </span>
  );
}

export default function EntryWrapper() {
  const [givingsList, setGivingsList] = useState<
    { key: number; type: string }[]
  >([]);

  const handleAddGiving = (type: string) => {
    const newKey =
      givingsList.length > 0
        ? Math.max(...givingsList.map((d: { key: number }) => d.key)) + 1
        : 0;
    const newGiving: { key: number; type: string } = {
      key: newKey,
      type: type,
    };
    setGivingsList([...givingsList, newGiving]);
  };

  const handleRemoveGiving = (key: number) => {
    setGivingsList(givingsList.filter((giving) => giving.key !== key));
  };

  return (
    <div className="flex flex-col gap-4 last-of-type:pb-4">
      <Input
        type="text"
        placeholder="Enter Name or Unique Id"
        name="name"
        className="mt-4"
      />
      <BigButton onClick={() => handleAddGiving("partnership")} type="button">
        <PlusIcon width={20} height={20} strokeWidth={1.5} /> Add Partnership
      </BigButton>
      {givingsList.map(
        (giving) =>
          giving.type === "partnership" && (
            <Givings
              type={giving.type}
              key={giving.key}
              uniqueId={giving.key}
              remove={handleRemoveGiving}
            />
          ),
      )}
      <BigButton onClick={() => handleAddGiving("offerings")} type="button">
        <PlusIcon width={20} height={20} strokeWidth={1.5} /> Add Tithe/Offering
      </BigButton>
      {givingsList.map(
        (giving) =>
          giving.type === "offerings" && (
            <Givings
              type={giving.type}
              key={giving.key}
              uniqueId={giving.key}
              remove={handleRemoveGiving}
            />
          ),
      )}
    </div>
  );
}
