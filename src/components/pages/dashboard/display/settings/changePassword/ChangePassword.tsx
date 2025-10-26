import { useState } from "react";
import LockIcon from "@/assets/icons/LockIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useChangePasswordValidation } from "@/hooks/profileValidation/useChangePasswordValidation";
import { useMockUser } from "@/hooks/useMockUser";
import { hashPassword } from "@/utils/hashPassword";
import { SettingsNav } from "../SettingsNav";
import "../Settings.css";

export function ChangePassword() {
    const { errors, validate } = useChangePasswordValidation();
    const { user, updateUser } = useMockUser();
    const [current, setCurrent] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [authError, setAuthError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError("");
        setSuccess(false);

        if (!user) return;

        if (validate(current, newPass)) {
            setSaving(true);

            const currentHash = await hashPassword(current);
            if (currentHash !== user.passwordHash) {
                setSaving(false);
                setAuthError("Current password is incorrect.");
                return;
            }

            const newHash = await hashPassword(newPass);
            await updateUser({ passwordHash: newHash });

            setSaving(false);
            setSuccess(true);
            setCurrent("");
            setNewPass("");
            setConfirm("");
        }
    };

    return (
        <div className="settings-page">
            <div className="settings-nav-wrapper">
                <SettingsNav />
            </div>
            <DashboardDisplay
                heading="Change Password"
                intro="Update your account password to keep your profile secure."
                icon={<LockIcon className="icon" />}
            >
                <form className="form-wrapper" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password</label>
                        {saving && <div className="spinner" />}
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={current}
                            onChange={(e) => setCurrent(e.target.value)}
                        />
                        {authError && <p className="form-error">{authError}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                        {errors.newPass && <p className="form-error">{errors.newPass}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                        {errors.confirm && <p className="form-error">{errors.confirm}</p>}
                    </div>

                    {success && <p className="form-success">Password updated successfully!</p>}

                    <div className="form-actions">
                        <button type="submit" disabled={saving}>
                            {saving ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </DashboardDisplay>
        </div>
    );
}