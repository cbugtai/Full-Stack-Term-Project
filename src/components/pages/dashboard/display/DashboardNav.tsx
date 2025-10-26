import { CustomNavBar } from "@/components/common/customNav/CustomNav";
import CogIcon from "@/assets/icons/CogIcon.svg?react";
import BoxIcon from "@/assets/icons/BoxIcon.svg?react";

export function DashboardNav() {
    const dashboardNavItems = [
        { to: "/dashboard/settings", label: "Settings", icon: <CogIcon /> },
        { to: "/dashboard/listings", label: "Listings", icon: <BoxIcon /> },
    ];

    return <CustomNavBar items={dashboardNavItems} />;
}