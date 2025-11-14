import { PrismaClient } from "@prisma/client";
import {
  categories,
  brands,
  conditions,
  statuses
} from "./seedLookupData";

const prisma = new PrismaClient();

export async function seedLookup() {
  await prisma.category.createMany({ data: categories, skipDuplicates: true });
  await prisma.brand.createMany({ data: brands, skipDuplicates: true });
  await prisma.condition.createMany({ data: conditions, skipDuplicates: true });
  await prisma.status.createMany({ data: statuses, skipDuplicates: true });

  console.log("Lookup tables seeded successfully!");
}