import { Sidebar } from "./sidebar/Sidebar";
import { DashboardDisplay } from "./display/DashboardDisplay";
import "./Dashboard.css";

export function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-main">
                <Sidebar />
                <DashboardDisplay />
            </div>
        </div>
    );
}