import { useEffect, useState } from "react";
import { mockUser } from "../apis/user/userData";
import {
    getProfilePicture,
    saveProfilePicture,
} from "../apis/user/profilePicRepo";
import {
    getUser,
    saveUser,
    deleteUser as removeUser,
} from "../apis/user/userRepo";
import type { User } from "../types/userSchema";

export function useMockUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let objectUrl: string | null = null;

        (async () => {
            const storedUser = await getUser();
            const file = await getProfilePicture();
            objectUrl = file ? URL.createObjectURL(file) : null;

            setUser({
                ...(storedUser || mockUser),
                profilePic: objectUrl || mockUser.profilePic,
            });

            setLoading(false);
        })();

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, []);

    const updateUser = async (updates: Partial<User>) => {
        const current = await getUser();
        const updated = { ...(current || mockUser), ...updates };
        await saveUser(updated);
        setUser(updated);
    };

    const updateProfilePicture = async (file: File) => {
        await saveProfilePicture(file);
        const url = URL.createObjectURL(file);

        setUser(prev => {
            if (prev?.profilePic?.startsWith("blob:")) {
                URL.revokeObjectURL(prev.profilePic);
            }
            const updated = prev ? { ...prev, profilePic: url } : null;
            if (updated) saveUser(updated);
            return updated;
        });
    };

    const deleteUser = async () => {
        await removeUser();
        setUser(null);
    };

    return {
        user,
        loading,
        updateUser,
        updateProfilePicture,
        deleteUser,
    };
}