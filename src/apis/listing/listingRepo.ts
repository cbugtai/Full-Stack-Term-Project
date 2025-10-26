import { openDB } from "@/utils/openDB";
import type { Listing } from "@/types/listing/listingModel";

const LISTING_STORE = "listings";

export async function saveListing(listing: Listing): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(LISTING_STORE, "readwrite");
    tx.objectStore(LISTING_STORE).put(listing, listing.id);

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function getAllListings(): Promise<Listing[]> {
    const db = await openDB();
    const tx = db.transaction(LISTING_STORE, "readonly");
    const request = tx.objectStore(LISTING_STORE).getAll();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

export async function getListingById(id: string): Promise<Listing | null> {
    const db = await openDB();
    const tx = db.transaction(LISTING_STORE, "readonly");
    const request = tx.objectStore(LISTING_STORE).get(id);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
    });
}

export async function getListingsByUserId(userId: string): Promise<Listing[]> {
    const all = await getAllListings();
    return all.filter((listing) => listing.userId === userId);
}

export async function updateListing(id: string, updates: Partial<Listing>): Promise<void> {
    const existing = await getListingById(id);
    if (!existing) throw new Error("Listing not found");

    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    await saveListing(updated);
}

export async function deleteListing(id: string): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(LISTING_STORE, "readwrite");
    tx.objectStore(LISTING_STORE).delete(id);

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function getHydratedListing(id: string): Promise<Listing | null> {
    const listing = await getListingById(id);
    if (!listing) return null;

    const db = await openDB();
    const tx = db.transaction("listingImages", "readonly");
    const request = tx.objectStore("listingImages").get(id);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            const file = request.result as File | null;
            const imageUrl = file ? URL.createObjectURL(file) : "";
            resolve({ ...listing, imageUrl });
        };
        request.onerror = () => reject(request.error);
    });
}