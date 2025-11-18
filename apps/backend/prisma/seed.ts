import { PrismaClient } from "@prisma/client";
import { seedSellers } from "./seedScripts/seedSellers";

const prisma = new PrismaClient();

// this method will add default values to the database
// IT WILL CLEAR THE DB WHEN INVOKED
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
async function main() {

    // clear all tables
    console.log("Clearing existing data")

    await prisma.userSellerPreference.deleteMany();
    await prisma.seller.deleteMany();
    await prisma.user.deleteMany();

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
