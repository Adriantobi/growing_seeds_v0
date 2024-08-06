import prisma from "./prisma";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  churchId: string;
}) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      churchId: data.churchId,
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
      churchId: "0",
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

export async function getChurches(
  search: string = "",
  limit: number | string = "all",
) {
  return prisma.church
    .findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      take: limit === "all" ? undefined : Number(limit),
    })
    .then((churches) => churches.map((church) => church.name));
}

export async function getChurchId(name: string) {
  return prisma.church
    .findFirst({
      where: {
        name: name,
      },
    })
    .then((church) => church?.id)
    .catch(() => null);
}

export async function isChurchValid(name: string) {
  return prisma.church
    .findFirst({
      where: {
        name: name,
      },
    })
    .then((church) => church !== null);
}
