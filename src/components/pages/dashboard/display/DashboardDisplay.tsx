import { mockUser } from "../../../../apis/user/mockUserData";
import "./DashboardDisplay.css";

export function DashboardDisplay() {
    return (
        <section className="dashboard-display">
            <h2>Welcome, {mockUser.name}</h2>
            <p className="dashboard-intro">
                This is your personalized dashboard.
                Use the options on the left to manage your profile,
                view listing history, and customize your experience.
            </p>

            <div className="dashboard-widgets">
                <div className="widget">
                    <h4>Recent Activity</h4>
                    <p>No recent changes. Start by updating your profile or viewing listings.</p>
                </div>

                <div className="widget">
                    <h4>Quick Tips</h4>
                    <ul>
                        <li>Use strong passwords for better security</li>
                        <li>Keep your contact info up to date</li>
                        <li>Listings auto-expire after 30 days</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}