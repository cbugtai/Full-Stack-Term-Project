import { useUser } from "@/context/userContext";
import "./UserCard.css";

export function UserCard({ onClose }: { onClose: () => void }) {
    const { user } = useUser();

    if (!user) return null;

    return (
        <div className="user-card-overlay">
            <div className="user-card">
                <button className="close-button" onClick={onClose} aria-label="Close profile card">x</button>
                <img src={user.profilePic} alt={`${user.username}'s profile`} className="profile-pic" />
                <h2 className="username">{user.username}</h2>
                <p className="bio">{user.bio}</p>
                <div className="contact-info">
                    <p><strong>Email:</strong> {user.email}</p>
                    {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                </div>
            </div>
        </div>
    );
}