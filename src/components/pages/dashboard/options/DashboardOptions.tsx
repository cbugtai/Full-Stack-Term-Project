import AddIcon from "@/assets/icons/AddIcon.svg?react";
import BoxIcon from "@/assets/icons/BoxIcon.svg?react";
import ClipIcon from "@/assets/icons/ClipIcon.svg?react";
import ClockIcon from "@/assets/icons/ClockIcon.svg?react";
import CogIcon from "@/assets/icons/CogIcon.svg?react";
import ImageIcon from "@/assets/icons/ImageIcon.svg?react";
import LockIcon from "@/assets/icons/LockIcon.svg?react";
import OptionsIcon from "@/assets/icons/OptionsIcon.svg?react";
import PencilIcon from "@/assets/icons/PencilIcon.svg?react";
import PhoneIcon from "@/assets/icons/PhoneIcon.svg?react";
import TrashIcon from "@/assets/icons/TrashIcon.svg?react";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
import WarnIcon from "@/assets/icons/WarnIcon.svg?react";
import { NavLink } from "react-router-dom";
import "./DashboardOptions.css";

export function DashboardOptions() {
    return (
        <section className="dashboard-options">
            <div className="options-row">
                <OptionsIcon className="icon" />
                <h2>Options</h2>
            </div>

            <div className="dashboard-section">
                <NavLink to="/dashboard/settings">
                    {({ isActive }) => (
                        <div className={`options-row option-item ${isActive ? "active" : ""}`}>
                            <CogIcon className="icon" />
                            <h3>Settings</h3>
                        </div>
                    )}
                </NavLink>

                <ul>
                    <li className="option-item">
                        <NavLink to="/dashboard/settings/change-username" className={({ isActive }) => isActive ? "active" : ""}>
                            <div className="options-row">
                                <UserIcon className="icon" />
                                <p>Change Username</p>
                            </div>
                        </NavLink>
                    </li>

                    <li className="option-item">
                        <NavLink to="/dashboard/settings/change-password" className={({ isActive }) => isActive ? "active" : ""}>
                            <div className="options-row">
                                <LockIcon className="icon" />
                                <p>Change Password</p>
                            </div>
                        </NavLink>
                    </li>

                    <li className="option-item">
                        <NavLink to="/dashboard/settings/change-profile-picture" className={({ isActive }) => isActive ? "active" : ""}>
                            <div className="options-row">
                                <ImageIcon className="icon" />
                                <p>Change Profile Picture</p>
                            </div>
                        </NavLink>
                    </li>

                    <li className="option-item">
                        <NavLink to="/dashboard/settings/edit-bio" className={({ isActive }) => isActive ? "active" : ""}>
                            <div className="options-row">
                                <PencilIcon className="icon" />
                                <p>Edit Bio</p>
                            </div>
                        </NavLink>
                    </li>

                    <li className="option-item">
                        <NavLink to="/dashboard/settings/manage-contact" className={({ isActive }) => isActive ? "active" : ""}>
                            <div className="options-row">
                                <PhoneIcon className="icon" />
                                <p>Manage Contact Information</p>
                            </div>
                        </NavLink>
                    </li>

                    <li className="option-item">
                        <NavLink to="/dashboard/settings/delete-account" className={({ isActive }) => isActive ? "active" : ""}>
                            <div className="options-row">
                                <WarnIcon className="icon" />
                                <p>Delete Account</p>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="dashboard-section">
                <div className="options-row">
                    <BoxIcon className="icon" />
                    <h3>Listings</h3>
                </div>
                <ul>
                    <li className="options-row">
                        <ClipIcon className="icon" />
                        <p>View Current Listings</p>
                    </li>
                    <li className="options-row">
                        <ClockIcon className="icon" />
                        <p>View Past Listings</p>
                    </li>
                    <li className="options-row">
                        <AddIcon className="icon" />
                        <p>Create Listing</p>
                    </li>
                    <li className="options-row">
                        <PencilIcon className="icon" />
                        <p>Edit Listing</p>
                    </li>
                    <li className="options-row">
                        <TrashIcon className="icon" />
                        <p>Remove Listing</p>
                    </li>
                </ul>
            </div>
        </section>
    );
}