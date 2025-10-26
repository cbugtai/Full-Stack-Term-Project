import { openDB } from "@/utils/openDB";

const LISTING_IMAGE_STORE = "listingImages";

export async function saveListingImage(id: string, file: File): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(LISTING_IMAGE_STORE, "readwrite");
    tx.objectStore(LISTING_IMAGE_STORE).put(file, id);

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}
