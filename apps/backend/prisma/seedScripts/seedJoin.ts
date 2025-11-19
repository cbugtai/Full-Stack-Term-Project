import { PrismaClient } from "@prisma/client";
import { brandCategoryMap } from "../seedData/seedJoinData";

const prisma = new PrismaClient();

export async function seedBrandCategory() {
    const [categories, brands] = await Promise.all([
        prisma.category.findMany(),
        prisma.brand.findMany(),
    ]);

    const catMap = new Map(categories.map(c => [c.category, c.id]));
    const brandMap = new Map(brands.map(b => [b.brand, b.id]));

    const brandCategoryData: { categoryId: number; brandId: number }[] = [];

    for (const [categoryName, brandNames] of Object.entries(brandCategoryMap)) {
        const categoryId = catMap.get(categoryName);
        if (!categoryId) continue;

        for (const brandName of brandNames) {
            const brandId = brandMap.get(brandName);
            if (!brandId) continue;

            brandCategoryData.push({ categoryId, brandId });
        }
    }

    await prisma.brandCategory.createMany({
        data: brandCategoryData,
        skipDuplicates: true,
    });

    console.log(`BrandCategory seeded: ${brandCategoryData.length} records`);
}