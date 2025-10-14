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
import { DASHBOARD_OPTIONS } from '../display/DashboardDisplay';
import "./DashboardOptions.css";

export function DashboardOptions({ onSelect }: { onSelect: (option: keyof typeof DASHBOARD_OPTIONS) => void }) {
    return (
        <section className="dashboard-options">
            <div className="options-row">
                <OptionsIcon className="icon" />
                <h2>Options</h2>
            </div>

            <div className="dashboard-section">
                <div className="options-row">
                    <CogIcon className="icon" />
                    <h3>Settings</h3>
                </div>
                <ul>
                    <li className="options-row" onClick={() => onSelect(DASHBOARD_OPTIONS.CHANGE_USERNAME)}>
                        <UserIcon className="icon" />
                        <p>Change Username</p>
                    </li>
                    <li className="options-row" onClick={() => onSelect(DASHBOARD_OPTIONS.CHANGE_PASSWORD)}>
                        <LockIcon className="icon" />
                        <p>Change Password</p>
                    </li>
                    <li className="options-row" onClick={() => onSelect(DASHBOARD_OPTIONS.CHANGE_PROFILE_PICTURE)}>
                        <ImageIcon className="icon" />
                        <p>Change Profile Picture</p>
                    </li>
                    <li className="options-row" onClick={() => onSelect(DASHBOARD_OPTIONS.EDIT_BIO)}>
                        <PencilIcon className="icon" />
                        <p>Edit Bio</p>
                    </li>
                    <li className="options-row" onClick={() => onSelect(DASHBOARD_OPTIONS.MANAGE_CONTACT)}>
                        <PhoneIcon className="icon" />
                        <p>Manage Contact Information</p>
                    </li>
                    <li className="options-row" onClick={() => onSelect(DASHBOARD_OPTIONS.DELETE_ACCOUNT)}>
                        <WarnIcon className="icon" />
                        <p>Delete Account</p>
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