import { openDB } from "@/utils/openDB";

const PIC_STORE = "profilePics";

export async function saveProfilePicture(file: File): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(PIC_STORE, "readwrite");
    const store = tx.objectStore(PIC_STORE);
    const request = store.put(file, "current");

    return new Promise((resolve, reject) => {
        request.onerror = () => reject(request.error);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function getProfilePicture(): Promise<File | null> {
    const db = await openDB();
    const tx = db.transaction(PIC_STORE, "readonly");
    const request = tx.objectStore(PIC_STORE).get("current");

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
    });
}

export async function deleteProfilePicture(): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(PIC_STORE, "readwrite");
    const store = tx.objectStore(PIC_STORE);
    store.delete("current");

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}