import { User } from "@prisma/client";
import prisma from "../../../../prisma/client";

export const getUserByClerkId = async (clerkId: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { clerkId } });
};

export const createUser = async (userData: {
    clerkId: string;
    email: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    profilePic?: string | null;
}): Promise<User> => {
    return prisma.user.create({ data: userData });
};

export const updateUserByClerkId = async (clerkId: string, data: Partial<User>) =>
    prisma.user.update({ where: { clerkId }, data });

export const deleteUserByClerkId = async (clerkId: string) =>
    prisma.user.delete({ where: { clerkId } });