import { useState } from "react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useUsernameValidation } from "@/hooks/profileValidation/useUsernameValidation";
import { useMockUser } from "@/hooks/useMockUser";
import "../Settings.css";

export function ChangeUsername() {
    const { error, validate } = useUsernameValidation();
    const { user, updateUser } = useMockUser();
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [username, setUsername] = useState(user?.username || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const username = (e.target as HTMLFormElement).newUsername.value;

        if (username === user?.username) return;

        if (await validate(username)) {
            setSaving(true);
            await updateUser({ username });
            setSaving(false);
            setSuccess(true);
        }
    };

    return (
        <DashboardDisplay heading="Change Username" intro="Update your display name as it appears across the platform.">
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="newUsername">New Username</label>
                    {saving && <div className="spinner" />}
                    <input
                        type="text"
                        id="newUsername"
                        name="newUsername"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        maxLength={20}
                    />
                    <p className="char-count">{username.length}/20 characters</p>
                    {error && <p className="form-error">{error}</p>}
                    {success && <p className="form-success">Username updated successfully!</p>}
                </div>

                <div className="form-actions">
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}