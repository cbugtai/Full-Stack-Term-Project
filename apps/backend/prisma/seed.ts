import { PrismaClient } from "@prisma/client";
import { seedSellers } from "./seedScripts/seedSellers";
import { seedLookup } from "./seedScripts/seedLookup";
import { seedBrandCategory } from "./seedScripts/seedJoin";
import { seedCasper } from "./seedScripts/seedCasper";

const prisma = new PrismaClient();

// this method will add default values to the database
// IT WILL CLEAR THE DB WHEN INVOKED
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
async function main() {

  // clear all tables
  console.log("Clearing existing data")

  await prisma.userSellerPreference.deleteMany();
  await prisma.reviews.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.listings.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.brandCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.condition.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.status.deleteMany();
  await prisma.user.deleteMany();

  // seed lookup tables
  await seedLookup();

  // seed brand-category join table
  await seedBrandCategory();

  //insert seed data from Casper
  await seedCasper();
  
  //insert seed data from Christian
   await seedSellers(prisma)
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
