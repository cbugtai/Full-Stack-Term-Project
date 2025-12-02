import BoxIcon from "@/assets/icons/BoxIcon.svg?react";
import ClipIcon from "@/assets/icons/ClipIcon.svg?react";
import ClockIcon from "@/assets/icons/ClockIcon.svg?react";
import CogIcon from "@/assets/icons/CogIcon.svg?react";
import OptionsIcon from "@/assets/icons/OptionsIcon.svg?react";
import PencilIcon from "@/assets/icons/PencilIcon.svg?react";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
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
                        <NavLink
                            to="/dashboard/settings/profile"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            <div className="options-row">
                                <UserIcon className="icon" />
                                <p>Account</p>
                            </div>
                        </NavLink>
                    </li>

                    <li className="option-item">
                        <NavLink
                            to="/dashboard/settings/profile-info"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            <div className="options-row">
                                <PencilIcon className="icon" />
                                <p>Profile Info</p>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="dashboard-section">
                <NavLink to="/dashboard/listings">
                    {({ isActive }) => (
                        <div className={`options-row option-item ${isActive ? "active" : ""}`}>
                            <BoxIcon className="icon" />
                            <h3>Listings</h3>
                        </div>
                    )}
                </NavLink>
                <ul>
                    <li className="option-item">
                        <NavLink to="/dashboard/listings/current" className={({ isActive }) => isActive ? "active" : ""}>
                            <div className="options-row">
                                <ClipIcon className="icon" />
                                <p>View Current Listings</p>
                            </div>
                        </NavLink>
                    </li>
                    <li className="option-item">
                        <NavLink to="/dashboard/listings/history" className={({ isActive }) => isActive ? "active" : ""}>
                            <div className="options-row">
                                <ClockIcon className="icon" />
                                <p>View Listing History</p>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </section>
    );
}