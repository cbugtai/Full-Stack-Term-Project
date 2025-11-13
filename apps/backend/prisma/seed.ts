import { PrismaClient } from "@prisma/client";
import { orgSeedData, employeeSeedData } from "./seedDataCasper";

const prisma = new PrismaClient();

// this method will add default values to the database
// IT WILL CLEAR THE DB WHEN INVOKED
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
async function main() {
  // clear table -- Casper
  await prisma.user.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.listings.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.category.deleteMany();
  await prisma.condition.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.status.deleteMany();
  await prisma.reviews.deleteMany();
  await prisma.wishlist.deleteMany();

  // insert terms to db -- Casper
  const createManyOrgs = await prisma.org.createManyAndReturn({
    data: orgSeedData,
    skipDuplicates: true,
  });

  const createManyEmployees = await prisma.employee.createManyAndReturn({
    data: employeeSeedData,
    skipDuplicates: true,
  });

  console.log(`CREATED Orgs: ${createManyOrgs}`);
  console.log(`CREATED Employees: ${createManyEmployees}`);
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
