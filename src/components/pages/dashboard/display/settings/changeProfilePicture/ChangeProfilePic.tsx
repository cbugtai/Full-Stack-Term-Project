import { useState, useEffect } from "react";
import ImageIcon from "@/assets/icons/ImageIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useProfilePictureValidation } from "@/hooks/profileValidation/useProfilePictureValidation";
import { useMockUser } from "@/hooks/useMockUser";
import { useUser } from "@/context/userContext";
import { getUser, saveUser } from "@/apis/user/userRepo";
import "../Settings.css";

export function ChangeProfilePicture() {
    const { error, validate } = useProfilePictureValidation();
    const { updateProfilePicture } = useMockUser();
    const { setUser } = useUser();
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const upload = async () => {
            if (!file || !validate(file)) return;

            setSaving(true);
            const newProfilePic = await updateProfilePicture(file);

            const currentUser = await getUser();
            if (currentUser) {
                const updatedUser = { ...currentUser, profilePic: newProfilePic };
                await saveUser(updatedUser);
                setUser(updatedUser);
                setSuccess(true);
            }

            setSaving(false);
        };

        upload();
    }, [file]);

    return (
        <DashboardDisplay
            heading="Change Profile Picture"
            intro="Upload a new profile image to personalize your account."
            icon={<ImageIcon className="icon" />}
        >
            <form className="form-wrapper" onSubmit={(e) => e.preventDefault()}>
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
            </form>
        </DashboardDisplay>
    );
}