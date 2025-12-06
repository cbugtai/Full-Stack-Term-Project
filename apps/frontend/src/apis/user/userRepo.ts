import type { User } from "../../../../../shared/types/user";

type UserResponseJSON = { message: string; data: User };

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const USER_ENDPOINT = "/users";

export async function getUser(sessionToken?: string | null): Promise<User | null> {
    const response = await fetch(`${BASE_URL}${USER_ENDPOINT}/`, sessionToken
        ? { headers: { Authorization: `Bearer ${sessionToken}` } }
        : undefined
    );

    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("Failed to fetch current user");
    }

    const json: UserResponseJSON = await response.json();
    return json.data;
}

export async function saveUser(data: Partial<User>, token: string): Promise<User> {
    const response = await fetch(`${BASE_URL}${USER_ENDPOINT}/`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Failed to save user");

    const json: UserResponseJSON = await response.json();
    return json.data;
}

export async function deleteUser(sessionToken: string): Promise<void> {
    const response = await fetch(`${BASE_URL}${USER_ENDPOINT}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${sessionToken}` },
    });

    if (!response.ok) throw new Error("Failed to delete current user");
}