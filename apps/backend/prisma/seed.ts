import { PrismaClient } from "@prisma/client";
import { mockProductData } from "./seedDataCasper";

const prisma = new PrismaClient();

// this method will add default values to the database
// IT WILL CLEAR THE DB WHEN INVOKED
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
async function main() {
  // clear table -- Casper
  await prisma.reviews.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.listings.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.category.deleteMany();
  await prisma.condition.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.status.deleteMany();
  await prisma.user.deleteMany();

  // insert terms to db -- Casper part
  // helper function for extracting unique values from seed data
  const uniqueValues = (arr: string[]) => Array.from(new Set(arr));

  const categories = uniqueValues(mockProductData.map((p) => p.category)).map(
    (category) => ({ category })
  );
  const conditions = uniqueValues(mockProductData.map((p) => p.condition)).map(
    (condition) => ({ condition })
  );
  const brands = uniqueValues(mockProductData.map((p) => p.brand)).map(
    (brand) => ({ brand })
  );

  const statuses = [{ status: "Available" }, { status: "Sold Out" }];

  // createMany with skipDuplicates to avoid conflicts
  await prisma.category.createMany({ data: categories, skipDuplicates: true });
  await prisma.condition.createMany({ data: conditions, skipDuplicates: true });
  await prisma.brand.createMany({ data: brands, skipDuplicates: true });
  await prisma.status.createMany({ data: statuses, skipDuplicates: true });

  // mappings for connecting foreign keys
  const [allCats, allConds, allBrands, allStatuses] = await Promise.all([
    prisma.category.findMany(),
    prisma.condition.findMany(),
    prisma.brand.findMany(),
    prisma.status.findMany(),
  ]);

  const catMap = new Map(
    allCats.map((c: { id: Number; category: String }) => [c.category, c.id])
  );
  const condMap = new Map(
    allConds.map((c: { id: Number; condition: String }) => [c.condition, c.id])
  );
  const brandMap = new Map(
    allBrands.map((b: { id: Number; brand: String }) => [b.brand, b.id])
  );
  const statusMap = new Map(
    allStatuses.map((s: { id: Number; status: String }) => [s.status, s.id])
  );

  // insert users
  const user1 = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    create: {
      firstName: "Alice",
      lastName: "Wang",
      userName: "alicew",
      email: "alice@example.com",
      phone: "204-000-0001",
      bio: "Love gadgets and books.",
      profilePic: "https://picsum.photos/seed/alice/200/200",
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: { create: { rating: "4.8" } },
    },
    update: {},
    include: { seller: true },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    create: {
      firstName: "Bob",
      lastName: "Li",
      userName: "bobli",
      email: "bob@example.com",
      phone: "204-000-0002",
      bio: "Student seller.",
      profilePic: "https://picsum.photos/seed/bob/200/200",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    update: {},
  });

  const sellerId = user1.seller?.id as number; // get sellerId from user1

  // insert listings
  const listingsCreated = [];
  for (const p of mockProductData) {
    const categoryId = catMap.get(p.category)!;
    const conditionId = condMap.get(p.condition)!;
    const brandId = brandMap.get(p.brand)!;

    const statusId =
      p.inventNum > p.soldNum
        ? statusMap.get("Available")!
        : statusMap.get("Sold Out")!;

    const now = new Date();

    const listing = await prisma.listings.create({
      data: {
        seller: { connect: { id: sellerId } },
        category: { connect: { id: categoryId } },
        condition: { connect: { id: conditionId } },
        brand: { connect: { id: brandId } },
        status: { connect: { id: statusId } },
        description: p.description,
        price: p.currentPrice,
        originalPrice: p.originalPrice,
        imageUrl: p.imgUrl,
        city: "Winnipeg",
        isNegotiable: true,
        isFree: p.currentPrice === 0,
        createdAt: now,
        updatedAt: now,
        title: p.description.substring(0, 30),
      },
    });
    listingsCreated.push({ src: p, db: listing });
  }

  // insert reviews from mockdata
  const iphoneItem = listingsCreated.find((x) => x.src.id === 2)?.db;
  if (iphoneItem && mockProductData[1].reviews?.length) {
    for (const r of mockProductData[1].reviews!) {
      const reviewer =
        r.user.toLowerCase() === "alice"
          ? user1
          : r.user.toLowerCase() === "bob"
          ? user2
          : user1;

      await prisma.reviews.create({
        data: {
          userId: reviewer.id,
          listingId: iphoneItem.id,
          comment: r.comment,
          createdAt: new Date(),
        },
      });
    }
  }

  // inser wishlist for Alice
  const wishTargets = listingsCreated.filter((x) => x.src.isWishlisted);
  for (const w of wishTargets) {
    await prisma.wishlist.upsert({
      where: { userId_listingId: { userId: user1.id, listingId: w.db.id } },
      create: {
        userId: user1.id,
        listingId: w.db.id,
        createdAt: new Date(),
      },
      update: {},
    });
  }

  // logging the results
  console.log(
    `Categories=${allCats.length}, Conditions=${allConds.length}, Brands=${allBrands.length},  Listings=${listingsCreated.length}, Wishlist=${wishTargets.length}`
  );
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
