import { useState } from "react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useContactValidation } from "@/hooks/profileValidation/useContactValidation";
import { useMockUser } from "@/hooks/useMockUser";
import "../Settings.css";

export function ManageContact() {
    const { errors, validate } = useContactValidation();
    const { user, updateUser } = useMockUser();
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email === user?.email && phone === user?.phone) return;

        if (validate(email, phone)) {
            setSaving(true);
            await updateUser({ email, phone });
            setSaving(false);
            setSuccess(true);
        }
    };

    return (
        <DashboardDisplay
        heading="Manage Contact Information"
        intro="Keep your email and phone number up to date for account recovery and notifications."
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
    );
}