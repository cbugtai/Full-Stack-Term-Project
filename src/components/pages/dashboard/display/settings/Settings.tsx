import { DashboardDisplay } from "../DashboardDisplay";
import { NavLink } from "react-router-dom";

export function Settings() {
    return (
        <DashboardDisplay
            heading="Settings"
            intro="Manage your account preferences and profile information below."
        >
            <NavLink to="/dashboard/settings/change-username" className="widget-link">
                <div className="widget">
                    <h3>Change Username</h3>
                    <p>Update your display name across the platform.</p>
                </div>
            </NavLink>

            <NavLink to="/dashboard/settings/change-password" className="widget-link">
                <div className="widget">
                    <h3>Change Password</h3>
                    <p>Secure your account with a new password.</p>
                </div>
            </NavLink>

            <NavLink to="/dashboard/settings/change-profile-picture" className="widget-link">
                <div className="widget">
                    <h3>Change Profile Picture</h3>
                    <p>Upload a new image to personalize your profile.</p>
                </div>
            </NavLink>

            <NavLink to="/dashboard/settings/edit-bio" className="widget-link">
                <div className="widget">
                    <h3>Edit Bio</h3>
                    <p>Write a short bio to share more about yourself.</p>
                </div>
            </NavLink>

            <NavLink to="/dashboard/settings/manage-contact" className="widget-link">
                <div className="widget">
                    <h3>Manage Contact Info</h3>
                    <p>Keep your email and phone number up to date.</p>
                </div>
            </NavLink>

            <NavLink to="/dashboard/settings/delete-account" className="widget-link danger">
                <div className="widget">
                    <h3>Delete Account</h3>
                    <p>Permanently remove your account and data.</p>
                </div>
            </NavLink>
        </DashboardDisplay>
    );
}