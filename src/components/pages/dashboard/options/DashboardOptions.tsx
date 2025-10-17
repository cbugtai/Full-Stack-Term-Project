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
                    <NavLink to="/dashboard/settings/change-username">
                        {({ isActive }) => (
                            <li className={`options-row option-item ${isActive ? "active" : ""}`}>
                                <UserIcon className="icon" />
                                <p>Change Username</p>
                            </li>
                        )}
                    </NavLink>

                    <NavLink to="/dashboard/settings/change-password">
                        {({ isActive }) => (
                            <li className={`options-row option-item ${isActive ? "active" : ""}`}>
                                <LockIcon className="icon" />
                                <p>Change Password</p>
                            </li>
                        )}
                    </NavLink>

                    <NavLink to="/dashboard/settings/change-profile-picture">
                        {({ isActive }) => (
                            <li className={`options-row option-item ${isActive ? "active" : ""}`}>
                                <ImageIcon className="icon" />
                                <p>Change Profile Picture</p>
                            </li>
                        )}
                    </NavLink>

                    <NavLink to="/dashboard/settings/edit-bio">
                        {({ isActive }) => (
                            <li className={`options-row option-item ${isActive ? "active" : ""}`}>
                                <PencilIcon className="icon" />
                                <p>Edit Bio</p>
                            </li>
                        )}
                    </NavLink>

                    <NavLink to="/dashboard/settings/manage-contact">
                        {({ isActive }) => (
                            <li className={`options-row option-item ${isActive ? "active" : ""}`}>
                                <PhoneIcon className="icon" />
                                <p>Manage Contact Information</p>
                            </li>
                        )}
                    </NavLink>

                    <NavLink to="/dashboard/settings/delete-account">
                        {({ isActive }) => (
                            <li className={`options-row option-item ${isActive ? "active" : ""}`}>
                                <WarnIcon className="icon" />
                                <p>Delete Account</p>
                            </li>
                        )}
                    </NavLink>
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