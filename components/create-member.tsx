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
      endPoint="/api/create/member"
    >
      <div className="flex flex-col h-full overflow-y-auto gap-3 no-scrollbar">
        <div className="flex flex-col gap-2">
          <label
            className="text-muted-foreground text-sm mt-3"
            htmlFor="memberId"
          >
            Member Id *
          </label>
          <Input
            name="memberId"
            type="text"
            required={true}
            placeholder="0004"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-muted-foreground text-sm mt-3"
            htmlFor="firstName"
          >
            First Name *
          </label>
          <Input
            name="firstName"
            type="text"
            required={true}
            placeholder="John"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="lastName">
            Last Name
          </label>
          <Input name="lastName" type="text" placeholder="Doe" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="birthDate">
            Date of Birth
          </label>
          <DatePicker
            required={true}
            minDate="01/01/1900"
            maxDate="01/01/2023"
            name="birthDate"
            onChange={() => {}}
            position="bottom"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="email">
            Email
          </label>
          <Input name="email" type="email" placeholder="abc@acme.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-muted-foreground text-sm"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <Input name="phoneNumber" type="tel" placeholder="08012345678" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="address">
            Address
          </label>
          <Input name="address" type="text" placeholder="123, Main Street" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="country">
            Country
          </label>
          <Input name="country" type="text" placeholder="Country" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="state">
            State
          </label>
          <Input name="state" type="text" placeholder="State" />
        </div>
        <span className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-muted-foreground text-sm" htmlFor="city">
              City
            </label>
            <Input name="city" type="text" placeholder="City" />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-muted-foreground text-sm"
              htmlFor="postalCode"
            >
              Postal Code
            </label>
            <Input name="postalCode" type="text" placeholder="12345" />
          </div>
        </span>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="department">
            Department
          </label>
          <Input
            name="department"
            type="text"
            placeholder="Technical Support"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label
            className="text-muted-foreground text-sm"
            htmlFor="maritalStatus"
          >
            Marital Status
          </label>
          <Input name="marital Status" type="text" placeholder="Single" />
        </div>{" "}
      </div>
    </SideModal>
  );
}
