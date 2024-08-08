import { prisma } from "./db";

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

export async function createEntry(data: {
  memberId: string;
  churchId: string;
  category: string;
  date: string;
  amount: number;
  paymentMethod: string;
  reference?: string;
  chequeNumber?: string;
  cashDenominations?: { denomination: number; quantity: number }[];
}) {
  return prisma.entry.create({
    data: {
      memberId: data.memberId,
      churchId: data.churchId,
      date: data.date,
      amount: data.amount,
      category: data.category,
      paymentMethod: data.paymentMethod,
      reference: data.reference || "",
      cashDenominations: data.cashDenominations || [],
      chequeNumber: data.chequeNumber || "",
    },
  });
}

export async function createMember(data: {
  firstName: string;
  lastName?: string;
  image?: string;
  imageName?: string;
  churchId: string;
  birthDate?: Date;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  department?: string;
}) {
  return prisma.member.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName || null,
      image: data.image || null,
      imageName: data.imageName || null,
      churchId: data.churchId,
      memberId: Math.random().toString(36).substring(7),
      birthDate: data.birthDate || null,
      email: data.email || null,
      phone: data.phone || null,
      address: data.address || null,
      country: data.country || null,
      state: data.state || null,
      city: data.city || null,
      postalCode: data.postalCode || null,
      department: data.department || null,
    },
  });
}

export async function deleteMembers(memberIds: string[]) {
  return prisma.member.deleteMany({
    where: {
      memberId: {
        in: memberIds,
      },
    },
  });
}

export async function getMembersWithPagination(
  churchId: string,
  search: string = "",
  limit: number = 25,
  offset: number = 0,
) {
  return prisma.member.findMany({
    where: {
      churchId: churchId,
      OR: [
        {
          firstName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          memberId: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    take: limit,
    skip: offset,
  });
}

export async function updateUserAuthToken(id: string, token: string) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      authToken: token,
    },
  });
}

export async function getChurchByUserId(id: string) {
  return prisma.user
    .findUnique({
      where: {
        id: id,
      },
    })
    .then((user) => user?.churchId);
}

export async function getChurchByEmail(email: string) {
  return prisma.user
    .findUnique({
      where: {
        email: email,
      },
    })
    .then((user) => user?.churchId);
}

export async function checkAuthValidity(email: string, token: string) {
  return prisma.user.findUniqueOrThrow({
    where: {
      email: email,
      authToken: token,
    },
  });
}
