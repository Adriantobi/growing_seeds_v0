import { prisma } from "./db";

export async function createUser(data: {
  name: string;
  email: string;
  authToken: string;
  password: string;
  churchId: string;
}) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      churchId: data.churchId,
      authToken: data.authToken,
      authExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      authProvider: "email",
    },
  });
}

export async function noPasswordUser(data: {
  name: string;
  email: string;
  image: string;
  authToken: string;
  authProvider: string;
}) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      image: data.image,
      authToken: data.authToken,
      authExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
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
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      password: true,
      imagePath: true,
      authToken: true,
      authProvider: true,
      authExpiresAt: true,
      createdAt: true,
      updatedAt: true,
      church: {
        select: {
          id: true,
          name: true,
          zone: true,
          country: true,
          currency: true,
          uniqueCode: true,
        },
      },
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
  reference?: string | null;
  chequeNumber?: string | null;
  cashDenominations?: { denomination: number; quantity: number }[] | null;
}) {
  return prisma.entry.create({
    data: {
      memberId: data.memberId,
      churchId: data.churchId,
      date: data.date,
      amount: data.amount,
      category: data.category,
      paymentMethod: data.paymentMethod,
      reference: data.reference || null,
      cashDenominations: data.cashDenominations || [],
      chequeNumber: data.chequeNumber || null,
    },
  });
}

export async function createMember(data: {
  firstName: string;
  lastName?: string;
  image?: string;
  imagePath?: string;
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
      imagePath: data.imagePath || null,
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
  pageSize: number = 25,
  pageNumber: number = 1,
  search: string = "",
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
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phone: {
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
    take: pageSize,
    skip: (pageNumber - 1) * pageSize,
  });
}

export async function updateUserAuthToken(id: string, token: string) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      authToken: token,
      authExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
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

export async function getUserDetails(email: string) {
  return prisma.user
    .findUnique({
      where: {
        email: email,
      },
    })
    .then((user) => {
      prisma.$disconnect();
      return user;
    });
}

export async function updateUserImageByEmail(
  email: string,
  image: string,
  imagePath: string,
) {
  return prisma.user.update({
    where: {
      email: email,
    },
    data: {
      image: image,
      imagePath: imagePath,
    },
  });
}

export async function getTransactionsWithPagination(
  churchId: string,
  pageSize: number = 25,
  pageNumber: number = 1,
  search: string = "",
) {
  return prisma.entry.findMany({
    where: {
      churchId: churchId,
      OR: [
        {
          memberId: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          paymentMethod: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          reference: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          chequeNumber: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      member: true,
      date: true,
      amount: true,
      category: true,
      paymentMethod: true,
      reference: true,
      chequeNumber: true,
      cashDenominations: true,
      updatedAt: true,
    },
    take: pageSize,
    skip: (pageNumber - 1) * pageSize,
  });
}
