import CogIcon from "@/assets/icons/CogIcon.svg?react";
import ImageIcon from "@/assets/icons/ImageIcon.svg?react";
import LockIcon from "@/assets/icons/LockIcon.svg?react";
import PencilIcon from "@/assets/icons/PencilIcon.svg?react";
import PhoneIcon from "@/assets/icons/PhoneIcon.svg?react";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
import WarnIcon from "@/assets/icons/WarnIcon.svg?react";
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
                <NavLink to="/dashboard/settings/change-username" className="widget-link">
                    <div className="widget">
                        <div className="display-row">
                            <UserIcon className="icon" />
                            <h3>Change Username</h3>
                        </div>
                        <p>Update your display name across the platform.</p>
                    </div>
                </NavLink>

                <NavLink to="/dashboard/settings/change-password" className="widget-link">
                    <div className="widget">
                        <div className="display-row">
                            <LockIcon className="icon" />
                            <h3>Change Password</h3>
                        </div>
                        <p>Secure your account with a new password.</p>
                    </div>
                </NavLink>

                <NavLink to="/dashboard/settings/change-profile-picture" className="widget-link">
                    <div className="widget">
                        <div className="display-row">
                            <ImageIcon className="icon" />
                            <h3>Change Profile Picture</h3>
                        </div>
                        <p>Upload a new image to personalize your profile.</p>
                    </div>
                </NavLink>

                <NavLink to="/dashboard/settings/edit-bio" className="widget-link">
                    <div className="widget">
                        <div className="display-row">
                            <PencilIcon className="icon" />
                            <h3>Edit Bio</h3>
                        </div>
                        <p>Write a short bio to share more about yourself.</p>
                    </div>
                </NavLink>

                <NavLink to="/dashboard/settings/manage-contact" className="widget-link">
                    <div className="widget">
                        <div className="display-row">
                            <PhoneIcon className="icon" />
                            <h3>Manage Contact Info</h3>
                        </div>
                        <p>Keep your email and phone number up to date.</p>
                    </div>
                </NavLink>

                <NavLink to="/dashboard/settings/delete-account" className="widget-link danger">
                    <div className="widget">
                        <div className="display-row">
                            <WarnIcon className="icon" />
                            <h3>Delete Account</h3>
                        </div>
                        <p>Permanently remove your account and data.</p>
                    </div>
                </NavLink>
            </DashboardDisplay>
        </div>
    );
}