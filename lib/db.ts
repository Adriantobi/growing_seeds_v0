import prisma from "./prisma";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      churchId: "clzhoeq1x000510se8rs7q9ns",
      authProvider: "email",
    },
  });
}

export async function noPasswordUser(data: {
  name: string;
  email: string;
  authProvider: string;
}) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      authProvider: data.authProvider,
      churchId: "clzhoeq1x000510se8rs7q9ns",
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function getChurches(search: string = "") {
  return prisma.church
    .findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    })
    .then((churches) => churches.map((church) => church.name));
}
