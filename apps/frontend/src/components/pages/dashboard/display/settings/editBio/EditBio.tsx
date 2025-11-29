import { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import PencilIcon from "@/assets/icons/PencilIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useBioValidation } from "@/hooks/profileValidation/useBioValidation";
import { saveUser } from "@/apis/user/userRepo";
import { SettingsNav } from "../SettingsNav";
import type { User } from "@/types/userSchema";
import { mapClerkUserToAppUser } from "@/utils/mapClerkUserToAppUser";
import "../Settings.css";

export function EditBio() {
    const { error, validate } = useBioValidation();
    const { getToken } = useAuth();
    const { isSignedIn, user } = useUser();

    const [bio, setBio] = useState<string>(
        (user?.unsafeMetadata as { bio?: string })?.bio ?? ""
    );
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isSignedIn) {
        return (
            <DashboardDisplay
                heading="Edit Bio"
                intro="You must be signed in to update your bio."
                icon={<PencilIcon className="icon" />}
                disableGrid
            >
                <p>Please sign in to edit your bio.</p>
            </DashboardDisplay>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        const trimmedBio = bio.trim();
        if (!validate(trimmedBio)) return;

        setSaving(true);

        try {
            const token = await getToken({ template: "backend" });
            if (!token) {
                console.error("No session token available");
                return;
            }

            const appUser: User = mapClerkUserToAppUser(user, {
                bio: trimmedBio,
            });

            await saveUser(appUser, token);
            setSuccess(true);
        } catch (err) {
            console.error("Failed to update bio:", err);
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
                heading="Edit Bio"
                intro="Write a short bio to personalize your profile and share a bit about yourself."
                icon={<PencilIcon className="icon" />}
                disableGrid
            >
                <form className="form-wrapper" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        {saving && <div className="spinner" />}
                        <textarea
                            id="bio"
                            name="bio"
                            rows={5}
                            placeholder="Tell us about yourself..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            maxLength={500}
                        />
                        <p className="char-count">{bio.length}/500 characters</p>
                        {error && <p className="form-error">{error}</p>}
                        {success && <p className="form-success">Bio updated successfully!</p>}
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Save Bio"}
                        </button>
                    </div>
                </form>
            </DashboardDisplay>
        </div>
    );
}