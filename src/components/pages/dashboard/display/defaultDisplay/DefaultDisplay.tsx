import { NavLink } from "react-router-dom";
import BoxIcon from "@/assets/icons/BoxIcon.svg?react";
import CogIcon from "@/assets/icons/CogIcon.svg?react";
import { mockUser } from "../../../../../apis/user/userData";
import { DashboardDisplay } from "../DashboardDisplay";

export function DefaultDisplay() {
    return (
        <DashboardDisplay
            heading={`Welcome, ${mockUser.firstName} ${mockUser.lastName}`}
            intro="This is your personalized dashboard. Use the options on the left to manage your profile, view listings, and customize your experience."
        >
            <NavLink to="/dashboard/settings" className="widget-link">
                <div className="widget">
                    <div className="display-row">
                        <CogIcon className="icon" />
                        <h3>Settings</h3>
                    </div>
                    <p>Update your account details, preferences, and profile information.</p>
                </div>
            </NavLink>

            <NavLink to="/dashboard/listings" className="widget-link">
                <div className="widget">
                    <div className="display-row">
                        <BoxIcon className="icon" />
                        <h3>Listings</h3>
                    </div>
                    <p>View and manage your current listings in one place.</p>
                </div>
            </NavLink>
        </DashboardDisplay>
    );
}