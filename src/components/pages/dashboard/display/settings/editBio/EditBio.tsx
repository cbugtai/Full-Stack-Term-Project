import { useState } from "react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useBioValidation } from "@/hooks/profileValidation/useBioValidation";
import { useMockUser } from "@/hooks/useMockUser";
import "../Settings.css";

export function EditBio() {
    const { error, validate } = useBioValidation();
    const { user, updateUser } = useMockUser();
    const [bio, setBio] = useState(user?.bio || "");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (bio === user?.bio) return;

        if (validate(bio)) {
        setSaving(true);
        await updateUser({ bio });
        setSaving(false);
        setSuccess(true);
        }
    };

    return (
        <DashboardDisplay
        heading="Edit Bio"
        intro="Write a short bio to personalize your profile and share a bit about yourself."
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