import { UserProfile, useUser } from "@clerk/clerk-react";
import { SettingsNav } from "../SettingsNav";
import { DashboardDisplay } from "../../DashboardDisplay";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
import "../Settings.css";

export function ProfilePage() {
    const { isSignedIn } = useUser();

    return (
        <div className="settings-page">
            <div className="settings-nav-wrapper">
                <SettingsNav />
            </div>

            {isSignedIn ? (
                <DashboardDisplay
                    heading="Account Settings"
                    intro="Manage your email, password, and multi-factor authentication below."
                    icon={<UserIcon className="icon" />}
                    disableGrid
                >
                    <UserProfile path="/dashboard/settings/profile" routing="path" />
                </DashboardDisplay>
            ) : (
                <DashboardDisplay
                    heading="Account Settings"
                    intro="You must be signed in to manage your account."
                    icon={<UserIcon className="icon" />}
                    disableGrid
                >
                    <p>Please sign in to manage your email, password, and multi-factor authentication.</p>
                </DashboardDisplay>
            )}
        </div>
    );
}