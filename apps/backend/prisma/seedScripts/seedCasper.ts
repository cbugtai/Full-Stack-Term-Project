import { PrismaClient } from "@prisma/client";
import { mockProductData } from "../seedData/seedDataCasper";

const prisma = new PrismaClient();

// this method will add default values to the database
// IT WILL CLEAR THE DB WHEN INVOKED
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
export async function seedCasper() {
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

  // createMany with skipDuplicates to avoid conflicts
  await prisma.category.createMany({ data: categories, skipDuplicates: true });
  await prisma.condition.createMany({ data: conditions, skipDuplicates: true });
  await prisma.brand.createMany({ data: brands, skipDuplicates: true });

  // mappings for connecting foreign keys
  const [allCats, allConds, allBrands, allStatuses] = await Promise.all([
    prisma.category.findMany(),
    prisma.condition.findMany(),
    prisma.brand.findMany(),
    prisma.status.findMany(),
  ]);

  const catMap = new Map(
    allCats.map((c: { id: number; category: string }) => [c.category, c.id])
  );
  const condMap = new Map(
    allConds.map((c: { id: number; condition: string }) => [c.condition, c.id])
  );
  const brandMap = new Map(
    allBrands.map((b: { id: number; brand: string }) => [b.brand, b.id])
  );
  const statusMap = new Map(
    allStatuses.map((s: { id: number; status: string }) => [s.status, s.id])
  );

  // insert users
  const user1 = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    create: {
      clerkId: "seed_alice_123",
      firstName: "Alice",
      lastName: "Wang",
      userName: "alicew",
      email: "alice@example.com",
      phone: "204-000-0001",
      bio: "Love gadgets and books.",
      profilePic: "https://picsum.photos/seed/alice/200/200",
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: {
        create: {
          rating: 96,
        },
      },
    },
    update: {},
    include: { seller: true },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    create: {
      clerkId: "seed_bob_123",
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
        ? statusMap.get("Active")!
        : statusMap.get("Sold")!;

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
  const iphoneItems = listingsCreated.filter(
    (x) => x.src.id === 2 || x.src.id === 4
  ); //get two products with reviews

  if (iphoneItems.length) {
    for (const item of iphoneItems) {
      // for each product
      for (const r of item.src.reviews!) {
        // for each review
        const reviewer =
          r.user.toLowerCase() === "alice"
            ? user1
            : r.user.toLowerCase() === "bob"
            ? user2
            : user1;

        await prisma.reviews.create({
          data: {
            userId: reviewer.id,
            listingId: item.db.id, // use the listing id from db record
            comment: r.comment,
            createdAt: new Date(),
          },
        });
      }
    }
  }

  // insert wishlist for Alice
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