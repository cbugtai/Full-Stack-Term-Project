import { PrismaClient } from "@prisma/client";
import { seedCasper } from "./seedCasper";

const prisma = new PrismaClient();

// this method will add default values to the database
// IT WILL CLEAR THE DB WHEN INVOKED
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
async function main() {
  // clear all tables
  await prisma.reviews.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.listings.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.category.deleteMany();
  await prisma.condition.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.status.deleteMany();
  await prisma.user.deleteMany();

  //insert seed data from Casper
  await seedCasper();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
