import type { Brand, Category, Status, Condition } from "../../../../../shared/types/metaTypes";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/meta`;

async function fetchMeta<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${BASE_URL}/${endpoint}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return res.json();
}

export const getBrands = async (): Promise<Brand[]> => {
    const data = await fetchMeta<{ id: number; brand: string }[]>("brands");
    return data.map(b => ({ id: b.id, name: b.brand }));
};

export const getCategories = async (): Promise<Category[]> => {
    const data = await fetchMeta<{ id: number; category: string }[]>("categories");
    return data.map(c => ({ id: c.id, name: c.category }));
};

export const getStatuses = async (): Promise<Status[]> => {
    const data = await fetchMeta<{ id: number; status: string }[]>("statuses");
    return data.map(s => ({ id: s.id, name: s.status }));
};

export const getConditions = async (): Promise<Condition[]> => {
    const data = await fetchMeta<{ id: number; condition: string }[]>("conditions");
    return data.map(c => ({ id: c.id, name: c.condition }));
};