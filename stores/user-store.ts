import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Zone {
  id: string;
  name: string;
  currency: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Church {
  id: string;
  name: string;
  zone: Zone;
  country: string;
  currency: string;
  uniqueCode: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image: string | null;
  imagePath: string | null;
  authProvider: string;
  authToken: string;
  authExpiresAt: Date | null;
  church: Church | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface UserStore {
  user: User;
  updateUserImage: (url: string | null) => void;
  updateUserImagePath: (url: string | null) => void;
  updateUserName: (name: string) => void;
  setUser: (user: Partial<User>) => void;
  resetUser: () => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: {
        id: "",
        email: "",
        name: "",
        image: "",
        imagePath: "",
        password: "",
        authProvider: "",
        authToken: "",
        church: null,
        authExpiresAt: null,
        createdAt: null,
        updatedAt: null,
      },
      updateUserImage: (url: string | null) =>
        set((state) => ({
          user: { ...state.user, image: url },
        })),
      updateUserName: (name: string) =>
        set((state) => ({
          user: { ...state.user, name },
        })),
      updateUserImagePath: (path: string | null) =>
        set((state) => ({
          user: { ...state.user, imagePath: path },
        })),
      setUser: (user: Partial<User>) =>
        set((state) => ({
          user: { ...state.user, ...user },
        })),
      resetUser: () =>
        set(() => ({
          user: {
            id: "",
            email: "",
            name: "",
            image: "",
            imagePath: "",
            password: "",
            authProvider: "",
            authToken: "",
            church: null,
            authExpiresAt: null,
            createdAt: null,
            updatedAt: null,
          },
        })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
