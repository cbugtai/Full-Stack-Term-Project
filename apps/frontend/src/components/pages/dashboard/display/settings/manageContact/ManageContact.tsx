import { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import PhoneIcon from "@/assets/icons/PhoneIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useContactValidation } from "@/hooks/profileValidation/useContactValidation";
import { saveUser } from "@/apis/user/userRepo";
import { SettingsNav } from "../SettingsNav";
import type { User } from "@/types/userSchema";
import { mapClerkUserToAppUser } from "@/utils/mapClerkUserToAppUser";
import "../Settings.css";

type AppMetadata = {
    phone?: string;
};

export function ManageContact() {
    const { errors, validate } = useContactValidation();
    const { getToken } = useAuth();
    const { isSignedIn, user } = useUser();

    const [email, setEmail] = useState<string>(
        user?.primaryEmailAddress?.emailAddress ?? ""
    );
    const [phone, setPhone] = useState<string>(
        (user?.unsafeMetadata as AppMetadata)?.phone ?? ""
    );
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isSignedIn) {
        return (
        <DashboardDisplay
            heading="Manage Contact Information"
            intro="You must be signed in to update your contact info."
            icon={<PhoneIcon className="icon" />}
            disableGrid
        >
            <p>Please sign in to manage your contact details.</p>
        </DashboardDisplay>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        const trimmedEmail = email.trim();
        const trimmedPhone = phone.trim();

        if (!validate(trimmedEmail, trimmedPhone)) return;

        setSaving(true);

        try {
            const token = await getToken({ template: "backend" });
            if (!token) {
                console.error("No session token available");
                return;
            }

            if (trimmedEmail !== user.primaryEmailAddress?.emailAddress) {
                const newEmail = await user.createEmailAddress({ email: trimmedEmail });
                await user.update({ primaryEmailAddressId: newEmail.id });
            }

            const appUser: User = mapClerkUserToAppUser(user, {
                phone: trimmedPhone,
                email: trimmedEmail,
            });
            await saveUser(appUser, token);

            setSuccess(true);
        } catch (error) {
            console.error("Failed to update contact info:", error);
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
                heading="Manage Contact Information"
                intro="Keep your email and phone number up to date for account recovery and notifications."
                icon={<PhoneIcon className="icon" />}
                disableGrid
            >
                <form className="form-wrapper" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        {saving && <div className="spinner" />}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && <p className="form-error">{errors.phone}</p>}
                    </div>

                    {success && (
                        <p className="form-success">Contact info updated successfully!</p>
                    )}

                    <div className="form-actions">
                        <button type="submit" disabled={saving}>
                            {saving ? "Updating..." : "Update Contact Info"}
                        </button>
                    </div>
                </form>
            </DashboardDisplay>
        </div>
    );
}