import { CustomNavBar } from "@/components/common/customNav/CustomNav";
import ClipIcon from "@/assets/icons/ClipIcon.svg?react";

export function ListingsNav() {
    const listingsNavItems = [
        { to: "/dashboard/listings/current", label: "Current", icon: <ClipIcon /> },
    ];

    return <CustomNavBar items={listingsNavItems} />;
}