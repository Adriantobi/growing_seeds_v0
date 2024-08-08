export type user = {
  id: string;
  email: string;
  name: string;
  image: string | null;
  imageName: string | null;
  password: string | null;
  authProvider: string;
  authToken: string | null;
  churchId: string;
  createdAt: Date;
  updatedAt: Date;
};
