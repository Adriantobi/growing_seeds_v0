"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useUserStore from "@/stores/user-store";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession() as { data: any };
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  useEffect(() => {
    if (session?.user && !user?.id) {
      setUser({
        id: session.user.id!,
        email: session.user.email!,
        name: session.user.name!,
        image: session.user.image!,
        imagePath: session.user.imagePath!,
        authProvider: session.user.provider!,
        authToken: session.user.authToken!,
        authExpiresAt: session.user.authExpiresAt!,
        church: session.user.church!,
        createdAt: session.user.createdAt!,
        updatedAt: session.user.updatedAt!,
      });
    }
  }, [session, setUser, user?.id]);

  return <>{children}</>;
}
