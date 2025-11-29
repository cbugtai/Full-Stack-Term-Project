import { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import WarnIcon from "@/assets/icons/WarnIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { useDeleteAccountValidation } from "@/hooks/profileValidation/useDeleteAccountValidation";
import { deleteUser  } from "@/apis/user/userRepo";
import { SettingsNav } from "../SettingsNav";
import "../Settings.css";

export function DeleteAccount() {
    const { error, validate } = useDeleteAccountValidation();
    const { isSignedIn, user } = useUser();
    const { getToken } = useAuth();

    const [success, setSuccess] = useState(false);
    const [saving, setSaving] = useState(false);

    if (!isSignedIn) {
        return (
            <DashboardDisplay
                heading="Delete Account"
                intro="You must be signed in to delete your account."
                icon={<WarnIcon className="icon" />}
                disableGrid
            >
                <p>Please sign in to continue.</p>
            </DashboardDisplay>
        );
    }

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        const confirmation = (e.target as HTMLFormElement).confirmation.value;

        if (!validate(confirmation)) return;

        setSaving(true);
        try {
            await user.delete();

            const token = await getToken({ template: "backend" });
            if (token) {
                await deleteUser(user.id, token);
            }

            setSuccess(true);
        } catch (err) {
            console.error("Failed to delete account:", err);
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
                heading="Delete Account"
                intro="Permanently remove your account and all associated data."
                icon={<WarnIcon className="icon" />}
                disableGrid
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
                        <p className="form-success">
                            Your account has been deleted successfully.
                        </p>
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