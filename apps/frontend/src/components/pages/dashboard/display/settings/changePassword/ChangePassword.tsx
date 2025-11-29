import { useUser } from "@clerk/clerk-react";
import { UserProfile } from "@clerk/clerk-react";
import LockIcon from "@/assets/icons/LockIcon.svg?react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { SettingsNav } from "../SettingsNav";
import "../Settings.css";

export function ChangePassword() {
    const { isSignedIn } = useUser();

    if (!isSignedIn) {
        return (
            <DashboardDisplay
                heading="Change Password"
                intro="You must be signed in to update your password."
                icon={<LockIcon className="icon" />}
                disableGrid
            >
                <p>Please sign in to change your password.</p>
            </DashboardDisplay>
        );
    }

    return (
        <div className="settings-page">
            <div className="settings-nav-wrapper">
                <SettingsNav />
            </div>
            <DashboardDisplay
                heading="Change Password"
                intro="Update your account password securely."
                icon={<LockIcon className="icon" />}
                disableGrid
            >
                <UserProfile path="/settings" routing="path" />
            </DashboardDisplay>
        </div>
    );
}