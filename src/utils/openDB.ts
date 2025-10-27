const DB_NAME = "UserDB";
const VERSION = 2;

export function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, VERSION);
        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains("user")) {
                db.createObjectStore("user");
            }

            if (!db.objectStoreNames.contains("profilePics")) {
                db.createObjectStore("profilePics");
            }

            if (!db.objectStoreNames.contains("listings")) {
                db.createObjectStore("listings");
            }

            if (!db.objectStoreNames.contains("listingImages")) {
                db.createObjectStore("listingImages");
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}