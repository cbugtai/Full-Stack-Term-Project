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
}): Promise<User> => {
    return prisma.user.create({ data: userData });
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
    return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: number): Promise<User> => {
    return prisma.user.delete({ where: { id } });
};