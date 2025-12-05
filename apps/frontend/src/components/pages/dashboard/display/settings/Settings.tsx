import CogIcon from "@/assets/icons/CogIcon.svg?react";
import PencilIcon from "@/assets/icons/PencilIcon.svg?react";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
import { DashboardDisplay } from "../DashboardDisplay";
import { DashboardNav } from "../DashboardNav";
import { NavLink } from "react-router-dom";

export function Settings() {
    return (
        <div className="settings-page">
            <div className="settings-nav-wrapper">
                <DashboardNav />
            </div>
            <DashboardDisplay
                heading="Settings"
                intro="Manage your account preferences and profile information below."
                icon={<CogIcon className="icon" />}
            >
                <NavLink to="/dashboard/settings/profile" className="widget-link">
                    <div className="widget">
                        <div className="display-row">
                            <UserIcon className="icon" />
                            <h3>Account</h3>
                        </div>
                        <p>Update email, password, and other account settings.</p>
                    </div>
                </NavLink>
                <NavLink to="/dashboard/settings/profile-info" className="widget-link">
                    <div className="widget">
                        <div className="display-row">
                            <PencilIcon className="icon" />
                            <h3>Profile Info</h3>
                        </div>
                        <p>Update your bio and phone number.</p>
                    </div>
                </NavLink>
            </DashboardDisplay>
        </div>
    );
}