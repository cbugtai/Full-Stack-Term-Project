import type { User } from "@/types/userSchema";

type UserResponseJSON = { message: string; data: User };

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const USER_ENDPOINT = "/users";

export async function getUser(userId: string, sessionToken?: string | null): Promise<User | null> {
    const response: Response = await fetch(
        `${BASE_URL}${USER_ENDPOINT}/${userId}`,
        sessionToken
        ? {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            },
        }
        : undefined
    );

    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch user with id ${userId}`);
    }

    const json: UserResponseJSON = await response.json();
    return json.data;
}

export async function saveUser(user: User, sessionToken: string): Promise<User> {
    const response: Response = await fetch(`${BASE_URL}${USER_ENDPOINT}`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to save user");
    }

    const json: UserResponseJSON = await response.json();
    return json.data;
}

export async function deleteUser(userId: string, sessionToken: string): Promise<void> {
    const response: Response = await fetch(`${BASE_URL}${USER_ENDPOINT}/${userId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${sessionToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to delete user with id ${userId}`);
    }
}

export async function getHydratedUser(userId: string, sessionToken?: string | null): Promise<User | null> {
    const user = await getUser(userId, sessionToken);
    if (!user) return null;

    const picResponse: Response = await fetch(`${BASE_URL}${USER_ENDPOINT}/${userId}/profile-pic`, {
        headers: sessionToken
        ? {
            Authorization: `Bearer ${sessionToken}`,
        }
        : undefined,
    });

    if (picResponse.ok) {
        const blob = await picResponse.blob();
        const blobUrl = URL.createObjectURL(blob);
        return { ...user, profilePic: blobUrl };
    }

    return user;
}