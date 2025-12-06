import type { ListingWithRelations } from "@/types/listing/listingModel";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const LISTING_ENDPOINT = "/listings";

export type CreateListingPayload = {
    sellerId: number;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    categoryId: number;
    conditionId: number;
    brandId: number;
    statusId: number;
    city: string;
    isNegotiable: boolean;
    isFree: boolean;
};

export type UpdateListingPayload = Partial<{
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    categoryId: number;
    conditionId: number;
    brandId: number;
    statusId: number;
    city: string;
    isNegotiable: boolean;
    isFree: boolean;
}>;

function getHeaders(token?: string, isJson = true): HeadersInit {
    const headers: HeadersInit = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (isJson) headers["Content-Type"] = "application/json";
    return headers;
}

export async function createListing(
    payload: CreateListingPayload,
    image?: File,
    token?: string
): Promise<ListingWithRelations> {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, String(value));
    });

    if (image) formData.append("file", image);

    const res = await fetch(`${BASE_URL}${LISTING_ENDPOINT}`, {
        method: "POST",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to create listing: ${text}`);
    }

    const json = await res.json();
    return json.data ?? json;
}

export async function getAllListings(token?: string): Promise<ListingWithRelations[]> {
    const res = await fetch(`${BASE_URL}${LISTING_ENDPOINT}`, { headers: getHeaders(token) });
    if (!res.ok) throw new Error("Failed to fetch listings");
    const json = await res.json();
    return json.data ?? json;
}

export async function getListingById(
    id: number,
    token?: string
): Promise<ListingWithRelations | null> {
    const res = await fetch(`${BASE_URL}${LISTING_ENDPOINT}/${id}`, { headers: getHeaders(token) });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
}

export async function getListingsBySeller(
    sellerId: number,
    token?: string
): Promise<ListingWithRelations[]> {
    const res = await fetch(`${BASE_URL}${LISTING_ENDPOINT}/seller/${sellerId}`, {
        headers: getHeaders(token),
    });
    if (res.status === 404) return [];
    if (!res.ok) throw new Error("Failed to fetch listings for seller");
    const json = await res.json();
    return json.data ?? json;
}

export async function updateListing(
    id: number,
    updates: UpdateListingPayload,
    image?: File,
    token?: string
): Promise<ListingWithRelations> {
    const headers: HeadersInit = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    let body: FormData | string;

    if (image) {
        const formData = new FormData();
        Object.entries(updates).forEach(([key, value]) => {
            if (key !== "id" && value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        });
        formData.append("file", image);
        body = formData;
    } else {
        const filtered: Record<string, any> = {};
        Object.entries(updates).forEach(([key, value]) => {
            if (key !== "id" && value !== undefined && value !== null) {
                filtered[key] = value;
            }
        });
        body = JSON.stringify(filtered);
        headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${BASE_URL}${LISTING_ENDPOINT}/${id}`, {
        method: "PUT",
        body,
        headers,
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to update listing: ${text}`);
    }

    const json = await res.json();
    return json.data ?? json;
}

export async function deleteListing(id: number, token?: string): Promise<void> {
    const res = await fetch(`${BASE_URL}${LISTING_ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: getHeaders(token),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete listing: ${text}`);
    }
}