import { useState } from "react";
import PencilIcon from "@/assets/icons/PencilIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useBioValidation } from "@/hooks/profileValidation/useBioValidation";
import { useUser } from "@/context/userContext";
import { saveUser } from "@/apis/user/userRepo";
import "../Settings.css";

export function EditBio() {
    const { error, validate } = useBioValidation();
    const { user, setUser } = useUser();
    const [bio, setBio] = useState(user?.bio ?? "");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        const trimmedBio = bio.trim();
        if (trimmedBio === user.bio || !validate(trimmedBio)) return;

        setSaving(true);
        const updatedUser = { ...user, bio: trimmedBio };

        try {
            await saveUser(updatedUser);
            setUser(updatedUser);
            setSuccess(true);
        } catch (err) {
            console.error("Failed to update bio:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardDisplay
            heading="Edit Bio"
            intro="Write a short bio to personalize your profile and share a bit about yourself."
            icon={<PencilIcon className="icon" />}
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
    );
}