const DB_NAME = "UserDB";
const VERSION = 1;

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
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}