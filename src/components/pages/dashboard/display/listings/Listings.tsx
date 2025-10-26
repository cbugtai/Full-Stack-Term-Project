import BoxIcon from "@/assets/icons/BoxIcon.svg?react";
import ClipIcon from "@/assets/icons/ClipIcon.svg?react";
import ClockIcon from "@/assets/icons/ClockIcon.svg?react";
import { DashboardDisplay } from "../DashboardDisplay";
import { DashboardNav } from "../DashboardNav";
import { NavLink } from "react-router-dom";

export function Listings() {
    return (
        <div className="listings-page">
            <DashboardNav />
            <DashboardDisplay
                heading="Listings"
                intro="View and manage your current and past listings."
                icon={<BoxIcon className="icon" />}
            >
                <NavLink to="/dashboard/listings/current" className="widget-link">
                    <div className="widget">
                        <div className="display-row">
                            <ClipIcon className="icon" />
                            <h3>Current Listings</h3>
                        </div>
                        <p>Browse and manage your active listings.</p>
                    </div>
                </NavLink>

                <NavLink to="/dashboard/listings/history" className="widget-link">
                    <div className="widget">
                        <div className="display-row">
                            <ClockIcon className="icon" />
                            <h3>Listing History</h3>
                        </div>
                        <p>Review your past listings and activity.</p>
                    </div>
                </NavLink>
            </DashboardDisplay>
        </div>
    );
}