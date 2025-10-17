import { openDB } from "@/utils/openDB";
import type { User } from "../../types/userSchema";

const USER_STORE = "user";

export async function saveUser(user: User): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(USER_STORE, "readwrite");
    tx.objectStore(USER_STORE).put(user, "current");

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function getUser(): Promise<User | null> {
    const db = await openDB();
    const tx = db.transaction(USER_STORE, "readonly");
    const request = tx.objectStore(USER_STORE).get("current");

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
    });
}

export async function deleteUser(): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(USER_STORE, "readwrite");
    tx.objectStore(USER_STORE).delete("current");

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}