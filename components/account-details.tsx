import { CenterModal } from "./ui/modals/center-modal";
import Input from "./ui/input/input";
import Image from "next/image";
import { BigButton } from "./ui/buttons/big-button";
import useUserStore, { User } from "@/stores/user-store";

interface AccountDetailsProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AccountDetails({ isOpen, onClose, user }: AccountDetailsProps) {
  const { updateUserImagePath, updateUserImage } = useUserStore();
  async function uploadNewImage(image: File) {
    const formData = new FormData();
    formData.append("image", image);
    console.log(image);
    formData.append("path", "profile");
    const response = await fetch("/api/upload/image", {
      method: "POST",
      headers: {
        Authorization: `${user?.authToken}`,
      },
      body: formData,
    });

    const res = await response.json();
    if (!response.ok) {
      console.error(res.error);
    } else {
      const upload = await fetch("/api/update/user-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user?.authToken}`,
        },
        body: JSON.stringify({
          email: user?.email,
          imageUrl: res.url,
          imagePath: res.image_path,
        }),
      });

      const uploadRes = await upload.json();
      if (!upload.ok) {
        console.error(uploadRes.error);
      } else {
        updateUserImage(res.url);
        updateUserImagePath(res.image_path);
      }
    }
  }

  async function deleteImage() {
    const response = await fetch("/api/delete/image", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${user?.authToken}`,
      },
      body: JSON.stringify({
        imagePath: user?.imagePath,
      }),
    });

    const res = await response.json();
    if (!response.ok) {
      console.error(res.error);
    } else {
      updateUserImage(null);
      updateUserImagePath(null);
    }
  }

  return (
    <CenterModal
      isOpen={isOpen}
      header="Account Details"
      subheader="View and edit your account details"
      onClose={onClose}
    >
      {user && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <span className="h-20 w-20 rounded-lg overflow-hidden aspect-square">
                  <Image
                    src={user?.image || "/images/avatar.jpg"}
                    width={0}
                    height={0}
                    alt="Adrian Tobi"
                    sizes="100vw"
                    className="object-cover w-full h-full"
                  />
                </span>
                <span className="flex flex-col gap-1">
                  <h3 className="text-muted-foreground text-sm">
                    Profile Image
                  </h3>
                  <p className="text-zinc-500 text-sm">PNG, JPG under 10MB</p>
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex flex-row items-center">
                  <input
                    type="file"
                    id="custom-input"
                    accept="image/*"
                    onChange={(e: any) => {
                      uploadNewImage(e.target.files[0]);
                      e.target.value = null;
                    }}
                    hidden
                  />
                  <label
                    htmlFor="custom-input"
                    className="border border-zinc-800 bg-zinc-800 bg-opacity-50 hover:bg-opacity-70 gap-1 text-sm flex rounded-lg px-4 py-2 cursor-pointer"
                  >
                    Upload Image
                  </label>
                </div>
                {!user.image || (
                  <BigButton
                    className="bg-red-500 hover:bg-red-700"
                    position="center"
                    type="button"
                    onClick={deleteImage}
                  >
                    Delete
                  </BigButton>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-muted-foreground text-sm" htmlFor="name">
              Name
            </label>
            <Input type="text" defaultValue={user.name} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-muted-foreground text-sm" htmlFor="email">
              Email
            </label>
            <Input
              type="text"
              placeholder={user.email}
              disabled={true}
              className="cursor-not-allowed"
            />
          </div>
        </div>
      )}
    </CenterModal>
  );
}
