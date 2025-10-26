import { useState } from "react";
import PhoneIcon from "@/assets/icons/PhoneIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useContactValidation } from "@/hooks/profileValidation/useContactValidation";
import { useUser } from "@/context/userContext";
import { saveUser } from "@/apis/user/userRepo";
import { SettingsNav } from "../SettingsNav";
import "../Settings.css";

export function ManageContact() {
    const { errors, validate } = useContactValidation();
    const { user, setUser } = useUser();
    const [email, setEmail] = useState(user?.email ?? "");
    const [phone, setPhone] = useState(user?.phone ?? "");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        const trimmedEmail = email.trim();
        const trimmedPhone = phone.trim();

        if (!validate(trimmedEmail, trimmedPhone)) return;

        const updates: Partial<typeof user> = {};
        if (trimmedEmail !== user.email) updates.email = trimmedEmail;
        if (trimmedPhone !== user.phone) updates.phone = trimmedPhone;
        if (Object.keys(updates).length === 0) return;

        setSaving(true);
        const updatedUser = { ...user, ...updates };

        try {
            await saveUser(updatedUser);
            setUser(updatedUser);
            setSuccess(true);
        } catch (error) {
            console.error("Failed to update contact info:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="settings-page">
            <SettingsNav />
            <DashboardDisplay
                heading="Manage Contact Information"
                intro="Keep your email and phone number up to date for account recovery and notifications."
                icon={<PhoneIcon className="icon" />}
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

                    {success && <p className="form-success">Contact info updated successfully!</p>}

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