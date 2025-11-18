import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function validateListing(value: { brandId: number; categoryId: number }) {
  const isValidCombo = await prisma.brandCategory.findUnique({
    where: {
      brandId_categoryId: {
        brandId: value.brandId,
        categoryId: value.categoryId,
      },
    },
  });

  if (!isValidCombo) {
    throw new Error("Invalid brand-category combination");
  }

  return true;
}