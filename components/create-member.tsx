import { BigButton } from "./ui/buttons/big-button";
import { DatePicker } from "./ui/input/date-picker";
import Input from "./ui/input/input";
import { SideModal } from "./ui/modals/side-modal";

interface CreateMemberProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMember({ isOpen, onClose }: CreateMemberProps) {
  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      header="Create Member"
      subheader="Add a new member to the system"
    >
      <div className="flex flex-col h-full overflow-y-auto gap-3 no-scrollbar">
        <div className="flex flex-col gap-2">
          <label
            className="text-muted-foreground text-sm mt-3"
            htmlFor="firstName"
          >
            First Name *
          </label>
          <Input
            name="First Name"
            type="text"
            required={true}
            placeholder="John"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="lastName">
            Last Name
          </label>
          <Input name="Last Name" type="text" placeholder="Doe" />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-muted-foreground text-sm"
            htmlFor="DateOfBirth"
          >
            Date of Birth
          </label>
          <DatePicker
            required={true}
            minDate="01/01/1900"
            maxDate="01/01/2023"
            name="Date of Birth"
            onChange={() => {}}
            position="bottom"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="Email">
            Email
          </label>
          <Input name="Email" type="email" placeholder="abc@acme.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-muted-foreground text-sm"
            htmlFor="PhoneNumber"
          >
            Phone Number
          </label>
          <Input name="Phone Number" type="tel" placeholder="08012345678" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="Address">
            Address
          </label>
          <Input name="Address" type="text" placeholder="123, Main Street" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="Country">
            Country
          </label>
          <Input name="Country" type="text" placeholder="Country" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="State">
            State
          </label>
          <Input name="State" type="text" placeholder="State" />
        </div>
        <span className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-muted-foreground text-sm" htmlFor="City">
              City
            </label>
            <Input name="City" type="text" placeholder="City" />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-muted-foreground text-sm"
              htmlFor="PostalCode"
            >
              Postal Code
            </label>
            <Input name="Postal Code" type="text" placeholder="12345" />
          </div>
        </span>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="Department">
            Department
          </label>
          <Input
            name="Department"
            type="text"
            placeholder="Technical Support"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label
            className="text-muted-foreground text-sm"
            htmlFor="MaritalStatus"
          >
            Marital Status
          </label>
          <Input name="Marital Status" type="text" placeholder="Single" />
        </div>{" "}
      </div>
    </SideModal>
  );
}
