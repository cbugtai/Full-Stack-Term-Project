import { CustomNavBar } from "@/components/common/customNav/CustomNav";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
import PencilIcon from "@/assets/icons/PencilIcon.svg?react";

export function SettingsNav() {
    const settingsNavItems = [
        { to: "/dashboard/settings/profile", label: "Account", icon: <UserIcon /> },
        { to: "/dashboard/settings/profile-info", label: "Profile-Info", icon: <PencilIcon /> },
    ];

    return <CustomNavBar items={settingsNavItems} />;
}