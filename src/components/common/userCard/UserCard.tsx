import type { User } from "@/types/userSchema";
import "./UserCard.css";

export function UserCard({ user, onClose }: { user: User; onClose: () => void }) {
    return (
        <div className="user-card-overlay">
            <div className="user-card">
                <button className="close-button" onClick={onClose}>X</button>
                <img src={user.profilePic} alt="Profile" className="profile-pic" />
                <h2>{user.username}</h2>
                <p className="bio">{user.bio}</p>
                <div className="contact-info">
                    <p><strong>Email:</strong> {user.email}</p>
                    {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                </div>
            </div>
        </div>
    );
}