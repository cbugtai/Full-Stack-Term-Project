import { User } from "@prisma/client";
import prisma from "../../../../prisma/client";

export const getUserByClerkId = async (clerkId: string): Promise<User & { seller?: any } | null> => {
    return prisma.user.findUnique({
        where: { clerkId },
        include: { seller: true },
    });
};

export const createUser = async (userData: {
    clerkId: string;
    email: string;
    userName: string;
    firstName?: string;
    lastName?: string;
    profilePic?: string | null;
}): Promise<User & { seller?: any }> => {
    return prisma.user.create({ data: userData, include: { seller: true } });
};

export const updateUserByClerkId = async (clerkId: string, data: Partial<User>) =>
    prisma.user.update({
        where: { clerkId },
        data,
        include: { seller: true },
    });

export const deleteUserByClerkId = async (clerkId: string) =>
    prisma.user.delete({ where: { clerkId }, include: { seller: true } });
