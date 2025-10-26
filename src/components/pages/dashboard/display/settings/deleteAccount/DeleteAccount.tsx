import { useState } from "react";
import WarnIcon from "@/assets/icons/WarnIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useDeleteAccountValidation } from "@/hooks/profileValidation/useDeleteAccountValidation";
import { useMockUser } from "@/hooks/useMockUser";
import { SettingsNav } from "../SettingsNav";
import "../Settings.css";

export function DeleteAccount() {
    const { error, validate } = useDeleteAccountValidation();
    const { deleteUser } = useMockUser();
    const [success, setSuccess] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        const confirmation = (e.target as HTMLFormElement).confirmation.value;

        if (validate(confirmation)) {
            setSaving(true);
            await deleteUser();
            setSaving(false);
            setSuccess(true);
        }
    };

    return (
        <div className="settings-page">
            <div className="settings-nav-wrapper">
                <SettingsNav />
            </div>
            <DashboardDisplay
                heading="Delete Account"
                intro="Permanently remove your account and all associated data."
                icon={<WarnIcon className="icon" />}
            >
                <form className="form-wrapper" onSubmit={handleDelete}>
                    <div className="delete-account-warning">
                        <p>This action is irreversible. Please confirm below.</p>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="confirmation"
                            placeholder="Type DELETE to confirm"
                        />
                        {error && <p className="form-error">{error}</p>}
                    </div>

                    {success && (
                        <p className="form-success">Your account has been deleted successfully.</p>
                    )}

                    <div className="form-actions">
                        <button className="danger" type="submit" disabled={saving}>
                            {saving ? "Deleting..." : "Delete My Account"}
                        </button>
                    </div>
                </form>
            </DashboardDisplay>
        </div>
    );
}