import { CustomNavBar } from "@/components/common/customNav/CustomNav";
import ClipIcon from "@/assets/icons/ClipIcon.svg?react";
import ClockIcon from "@/assets/icons/ClockIcon.svg?react";

export function ListingsNav() {
    const listingsNavItems = [
        { to: "/dashboard/listings/current", label: "Current", icon: <ClipIcon /> },
        { to: "/dashboard/listings/history", label: "History", icon: <ClockIcon /> },
    ];

    return <CustomNavBar items={listingsNavItems} />;
}