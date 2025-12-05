import type { Listing } from "@/types/listing/listingModel";

const API_URL = "/api/v1/listings";

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

export async function createListing(payload: CreateListingPayload, image?: File) {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
    });

    if (image) formData.append("file", image);

    const res = await fetch("/api/v1/listings", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("Failed to create listing");

    return res.json() as Promise<Listing>;
}

export async function getAllListings(): Promise<Listing[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch listings");
    return res.json();
}

export async function getListingById(id: number): Promise<Listing | null> {
    const res = await fetch(`${API_URL}/${id}`);
    return res.ok ? res.json() : null;
}

export async function getListingsBySeller(sellerId: number): Promise<Listing[]> {
    const res = await fetch(`${API_URL}/seller/${sellerId}/listings`);
    if (!res.ok) throw new Error("Failed to fetch listings for seller");
    return res.json();
}

export async function updateListing(id: number, updates: Partial<Listing>) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error("Failed to update listing");
    return res.json() as Promise<Listing>;
}

export async function deleteListing(id: number) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete listing");
}