import { getServerSession } from "next-auth";
import { SideBarClient } from "./side-bar-client";
import { getUserDetails } from "@/lib/queries";

export async function SideBar() {
  const session = await getServerSession();
  const user = await getUserDetails(session?.user?.email!);

  return <SideBarClient user={user} />;
}
