import { useState } from "react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useProfilePictureValidation } from "@/hooks/profileValidation/useProfilePictureValidation";
import { useMockUser } from "@/hooks/useMockUser";
import "../Settings.css";

export function ChangeProfilePicture() {
    const { error, validate } = useProfilePictureValidation();
    const { updateProfilePicture } = useMockUser();
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !validate(file)) return;

        setSaving(true);
        await updateProfilePicture(file);
        setSaving(false);
        setSuccess(true);
    };

    return (
        <DashboardDisplay
        heading="Change Profile Picture"
        intro="Upload a new profile image to personalize your account."
        >
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="profilePicture" className="custom-file-label">
                        Upload Image
                    </label>
                    {saving && <div className="spinner" />}
                    <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        className="hidden-file-input"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    {error && <p className="form-error">{error}</p>}
                    {success && <p className="form-success">Profile picture updated!</p>}
                    </div>

                    <div className="form-actions">
                    <button type="submit" disabled={saving || !file}>
                        {saving ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </form>
        </DashboardDisplay>
    );
}