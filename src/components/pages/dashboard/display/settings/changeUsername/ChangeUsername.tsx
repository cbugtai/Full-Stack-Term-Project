import { useState } from "react";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useUsernameValidation } from "@/hooks/profileValidation/useUsernameValidation";
import { useUser } from "@/context/userContext";
import { saveUser } from "@/apis/user/userRepo";
import "../Settings.css";

export function ChangeUsername() {
    const { error, validate } = useUsernameValidation();
    const { user, setUser } = useUser();
    const [username, setUsername] = useState(user?.username ?? "");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        const trimmedUsername = username.trim();
        if (trimmedUsername === user.username || !(await validate(trimmedUsername))) return;

        setSaving(true);
        const updatedUser = { ...user, username: trimmedUsername };

        try {
            await saveUser(updatedUser);
            setUser(updatedUser);
            setSuccess(true);
        } catch (err) {
            console.error("Failed to update username:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardDisplay
            heading="Change Username"
            intro="Update your display name as it appears across the platform."
            icon={<UserIcon className="icon" />}
        >
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="newUsername">New Username</label>
                    {saving && <div className="spinner" />}
                    <input
                        type="text"
                        id="newUsername"
                        name="newUsername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={20}
                    />
                    <p className="char-count">{username.length}/20 characters</p>
                    {error && <p className="form-error">{error}</p>}
                    {success && <p className="form-success">Username updated successfully!</p>}
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={saving}>
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </DashboardDisplay>
    );
}