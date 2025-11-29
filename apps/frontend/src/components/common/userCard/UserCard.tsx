import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { User } from "@/types/userSchema";
import { getHydratedUser } from "@/apis/user/userRepo";
import "./UserCard.css";

export function UserCard({ onClose }: { onClose: () => void }) {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [backendUser, setBackendUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchBackendUser = async () => {
        if (!user?.id) return;
        try {
            const token = await getToken({ template: "default" });
            const data = await getHydratedUser(user.id, token ?? undefined);
            setBackendUser(data);
        } catch (err) {
            console.error("Failed to fetch backend user:", err);
        }
        };
        fetchBackendUser();
    }, [user?.id, getToken]);

    if (!user) return null;

    return (
        <div className="user-card-overlay">
            <div className="user-card">
                <button className="close-button" onClick={onClose} aria-label="Close profile card">x</button>
                <img
                    src={user.imageUrl}
                    alt={`${user.username || "User"}'s profile`}
                    className="profile-pic"
                />
                <h2 className="username">
                    {user.username || user.primaryEmailAddress?.emailAddress}
                </h2>
                <p className="bio">{backendUser?.bio ?? "No bio available"}</p>
                <div className="contact-info">
                    <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
                    {backendUser?.phone && <p><strong>Phone:</strong> {backendUser.phone}</p>}
                </div>
            </div>
        </div>
    );
}