import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import PencilIcon from "@/assets/icons/PencilIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { saveUser, getHydratedUser } from "@/apis/user/userRepo";
import { SettingsNav } from "../SettingsNav";
import "../Settings.css";
import type { User } from "../../../../../../../../../shared/types/user";

type ProfileFields = {
    bio: string;
    phone: string;
};

export function ProfileInfoPage() {
    const { isSignedIn, user: clerkUser } = useUser();
    const { getToken } = useAuth();
    const [userData, setUserData] = useState<ProfileFields>({ bio: "", phone: "" });
    const [loading, setLoading] = useState(true);
    const [savingField, setSavingField] = useState<"bio" | "phone" | null>(null);
    const [successField, setSuccessField] = useState<"bio" | "phone" | null>(null);
    const [errorField, setErrorField] = useState<"bio" | "phone" | null>(null);

    useEffect(() => {
        const fetchBackendUser = async () => {
            if (!clerkUser?.id) {
                setLoading(false);
                return;
            }

            try {
                const token = await getToken({ template: "default" });
                if (!token) throw new Error("No session token available");

                const backendUser: User = await getHydratedUser(token);

                setUserData({
                    bio: backendUser.bio ?? "",
                    phone: backendUser.phone ?? "",
                });
            } catch (err) {
                console.error("Failed to load profile info:", err);
                setErrorField("bio");
            } finally {
                setLoading(false);
            }
        };

        fetchBackendUser();
    }, [clerkUser?.id, getToken]);

    const handleChange = (field: keyof ProfileFields, value: string) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveField = async (field: keyof ProfileFields) => {
        setSavingField(field);
        setErrorField(null);
        setSuccessField(null);

        try {
            const token = await getToken({ template: "default" });
            if (!token) throw new Error("No session token available");

            await saveUser({ [field]: userData[field] }, token);
            setSuccessField(field);
        } catch (err) {
            console.error(`Failed to save ${field}:`, err);
            setErrorField(field);
        } finally {
            setSavingField(null);
        }
    };

    if (!isSignedIn) {
        return (
            <DashboardDisplay
                heading="Profile Info"
                intro="You must be signed in to edit your profile info."
                icon={<PencilIcon className="icon" />}
                disableGrid
            >
                <p>Please sign in to edit your bio and phone number.</p>
            </DashboardDisplay>
        );
    }

    if (loading) return <p>Loading profile info...</p>;

    return (
        <div className="settings-page">
            <div className="settings-nav-wrapper">
                <SettingsNav />
            </div>

            <DashboardDisplay
                heading="Profile Info"
                intro="Update your bio and phone number below."
                icon={<PencilIcon className="icon" />}
                disableGrid
            >
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        rows={5}
                        value={userData.bio}
                        onChange={(e) => handleChange("bio", e.target.value)}
                        placeholder="Tell us about yourself..."
                        maxLength={500}
                    />
                    <p className="char-count">{userData.bio.length}/500 characters</p>
                    {errorField === "bio" && <p className="form-error">Failed to save bio.</p>}
                    {successField === "bio" && <p className="form-success">Bio updated successfully!</p>}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => handleSaveField("bio")}
                            disabled={savingField === "bio"}
                        >
                            {savingField === "bio" ? "Saving..." : "Save Bio"}
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        value={userData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+1 555 123 4567"
                    />
                    {errorField === "phone" && <p className="form-error">Failed to save phone.</p>}
                    {successField === "phone" && <p className="form-success">Phone updated successfully!</p>}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => handleSaveField("phone")}
                            disabled={savingField === "phone"}
                        >
                            {savingField === "phone" ? "Saving..." : "Save Phone"}
                        </button>
                    </div>
                </div>
            </DashboardDisplay>
        </div>
    );
}