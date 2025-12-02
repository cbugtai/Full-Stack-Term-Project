import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { User } from "../../../../../../shared/types/user";
import { getHydratedUser } from "@/apis/user/userRepo";
import "./UserCard.css";

export function UserCard({ onClose }: { onClose: () => void }) {
    const { getToken } = useAuth();
    const [backendUser, setBackendUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            try {
                const token = await getToken({ template: "default" });
                if (!token) throw new Error("No session token");

                const data = await getHydratedUser(token);
                if (isMounted) setBackendUser(data);
            } catch (err) {
                console.error("Failed to fetch backend user:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUser();

        return () => {
            isMounted = false;
        };
    }, [getToken]);

    if (loading) return <p>Loading user...</p>;
    if (!backendUser) return <p>User not found</p>;

    return (
        <div className="user-card-overlay">
            <div className="user-card">
                <button className="close-button" onClick={onClose} aria-label="Close profile card">
                    X
                </button>

                <img
                    src={backendUser.profilePic ?? "/default-profile.png"}
                    alt={`${backendUser.username || "User"}'s profile`}
                    className="profile-pic"
                />

                <h2 className="username">{backendUser.username || backendUser.email}</h2>

                <p className="bio">{backendUser.bio ?? "No bio available"}</p>

                <div className="contact-info">
                    <p><strong>Email:</strong> {backendUser.email}</p>
                    <p><strong>Phone:</strong> {backendUser.phone ?? "Not provided"}</p>
                </div>
            </div>
        </div>
    );
}