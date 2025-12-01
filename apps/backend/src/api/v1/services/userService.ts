import { User } from "@prisma/client";
import prisma from "../../../../prisma/client";

export const getUserByClerkUserId = async (
  id: string
): Promise<User | null> => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      clerkUserId: id,
    },
  });

  if (!user) {
    return null;
  } else {
    return user;
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return null;
  } else {
    return user;
  }
};

export const createUser = async (userData: {
  clerkUserId: string;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
}): Promise<User> => {
  const newUser = await prisma.user.create({
    data: {
      ...userData,
    },
  });

  return newUser;
};
