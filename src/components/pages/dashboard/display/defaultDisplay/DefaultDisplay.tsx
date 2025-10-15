import BulbIcon from "@/assets/icons/BulbIcon.svg?react";
import DocumentCheckIcon from "@/assets/icons/DocumentCheckIcon.svg?react";
import { mockUser } from "../../../../../apis/user/mockUserData";
import { DashboardDisplay } from "../DashboardDisplay";
import "./DefaultDisplay.css";

export function DefaultDisplay() {
    return (
        <DashboardDisplay
            heading={`Welcome, ${mockUser.name}`}
            intro="This is your personalized dashboard. Use the options on the left to manage your profile, view listing history, and customize your experience."
        >
            <div className="widget">
                <div className="display-row">
                    <DocumentCheckIcon className="icon" />
                    <h3>Recent Activity</h3>
                </div>
                <p>No recent changes. Start by updating your profile or viewing listings.</p>
            </div>

            <div className="widget">
                <div className="display-row">
                    <BulbIcon className="icon" />
                    <h3>Quick Tips</h3>
                </div>
                <ul>
                    <li>Use strong passwords for better security</li>
                    <li>Keep your contact info up to date</li>
                    <li>Listings auto-expire after 30 days</li>
                </ul>
            </div>
        </DashboardDisplay>
    );
}