import type { Brand, Category, Status, Condition } from "../../../../../shared/types/metaTypes";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/meta`;

export async function getBrands(): Promise<Brand[]> {
    const res = await fetch(`${BASE_URL}/brands`);
    if (!res.ok) throw new Error("Failed to fetch brands");
    return res.json();
}

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}

export async function getStatuses(): Promise<Status[]> {
    const res = await fetch(`${BASE_URL}/statuses`);
    if (!res.ok) throw new Error("Failed to fetch statuses");
    return res.json();
}

export async function getConditions(): Promise<Condition[]> {
    const res = await fetch(`${BASE_URL}/conditions`);
    if (!res.ok) throw new Error("Failed to fetch conditions");
    return res.json();
}