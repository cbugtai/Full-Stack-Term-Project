import prisma from "../../../../prisma/client";
import type { Brand, Category, Status, Condition } from "@prisma/client";

export const getBrands = async (): Promise<Brand[]> => {
    return prisma.brand.findMany();
};

export const getCategories = async (): Promise<Category[]> => {
    return prisma.category.findMany();
};

export const getStatuses = async (): Promise<Status[]> => {
    return prisma.status.findMany();
};

export const getConditions = async (): Promise<Condition[]> => {
    return prisma.condition.findMany();
};