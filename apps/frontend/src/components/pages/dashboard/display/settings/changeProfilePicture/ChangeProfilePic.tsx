import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import ImageIcon from "@/assets/icons/ImageIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useProfilePictureValidation } from "@/hooks/profileValidation/useProfilePictureValidation";
import { saveUser } from "@/apis/user/userRepo";
import { SettingsNav } from "../SettingsNav";
import type { User } from "@/types/userSchema";
import { mapClerkUserToAppUser } from "@/utils/mapClerkUserToAppUser";
import "../Settings.css";

export function ChangeProfilePicture() {
    const { error, validate } = useProfilePictureValidation();
    const { isSignedIn, user } = useUser();
    const { getToken } = useAuth();

    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const upload = async () => {
            if (!file || !validate(file) || !user?.id) return;

            setSaving(true);

            try {
                const newProfilePic = URL.createObjectURL(file);

                const token = await getToken({ template: "backend" });
                if (!token) {
                    console.error("No session token available");
                    return;
                }

                const appUser: User = mapClerkUserToAppUser(user, {
                    profilePic: newProfilePic,
                });

                await saveUser(appUser, token);
                setSuccess(true);
            } catch (err) {
                console.error("Failed to update profile picture:", err);
            } finally {
                setSaving(false);
            }
        };

        upload();
    }, [file, user, getToken, validate]);

    if (!isSignedIn) {
        return (
            <DashboardDisplay
                heading="Change Profile Picture"
                intro="You must be signed in to update your profile picture."
                icon={<ImageIcon className="icon" />}
                disableGrid
            >
                <p>Please sign in to change your profile picture.</p>
            </DashboardDisplay>
        );
    }

    return (
        <div className="settings-page">
            <div className="settings-nav-wrapper">
                <SettingsNav />
            </div>
            <DashboardDisplay
                heading="Change Profile Picture"
                intro="Upload a new profile image to personalize your account."
                icon={<ImageIcon className="icon" />}
                disableGrid
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
        </div>
    );
}