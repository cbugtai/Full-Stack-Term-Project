import { CustomNavBar } from "@/components/common/customNav/CustomNav";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
import LockIcon from "@/assets/icons/LockIcon.svg?react";
import ImageIcon from "@/assets/icons/ImageIcon.svg?react";
import PencilIcon from "@/assets/icons/PencilIcon.svg?react";
import PhoneIcon from "@/assets/icons/PhoneIcon.svg?react";
import WarnIcon from "@/assets/icons/WarnIcon.svg?react";

export function SettingsNav() {
    const settingsNavItems = [
        { to: "/dashboard/settings/change-username", label: "Username", icon: <UserIcon /> },
        { to: "/dashboard/settings/change-password", label: "Password", icon: <LockIcon /> },
        { to: "/dashboard/settings/change-profile-picture", label: "Profile Pic", icon: <ImageIcon /> },
        { to: "/dashboard/settings/edit-bio", label: "Bio", icon: <PencilIcon /> },
        { to: "/dashboard/settings/manage-contact", label: "Contact Info", icon: <PhoneIcon /> },
        { to: "/dashboard/settings/delete-account", label: "Delete", icon: <WarnIcon /> },
    ];

    return <CustomNavBar items={settingsNavItems} />;
}