import { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useUsernameValidation } from "@/hooks/profileValidation/useUsernameValidation";
import { saveUser } from "@/apis/user/userRepo";
import { SettingsNav } from "../SettingsNav";
import type { User } from "@/types/userSchema";
import { mapClerkUserToAppUser } from "@/utils/mapClerkUserToAppUser";
import "../Settings.css";

export function ChangeUsername() {
    const { error, validate } = useUsernameValidation();
    const { isSignedIn, user } = useUser();
    const { getToken } = useAuth();

    const [username, setUsername] = useState<string>(user?.username ?? "");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isSignedIn) {
        return (
            <DashboardDisplay
                heading="Change Username"
                intro="You must be signed in to update your username."
                icon={<UserIcon className="icon" />}
                disableGrid
            >
                <p>Please sign in to change your username.</p>
            </DashboardDisplay>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        const trimmedUsername = username.trim();
        if (trimmedUsername === user.username || !(await validate(trimmedUsername))) return;

        setSaving(true);

        try {
            await user.update({ username: trimmedUsername });

            const token = await getToken({ template: "backend" });
            if (token) {
                const appUser: User = mapClerkUserToAppUser(user, {
                username: trimmedUsername,
                });
                await saveUser(appUser, token);
            }

            setSuccess(true);
        } catch (err) {
            console.error("Failed to update username:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="settings-page">
            <div className="settings-nav-wrapper">
                <SettingsNav />
            </div>
            <DashboardDisplay
                heading="Change Username"
                intro="Update your display name as it appears across the platform."
                icon={<UserIcon className="icon" />}
                disableGrid
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
        </div>
    );
}