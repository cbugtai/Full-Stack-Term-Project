import { DashboardOptions } from "./options/DashboardOptions";
import { DashboardDisplay } from "./display/DashboardDisplay";
import "./Dashboard.css";

export function Dashboard() {
    return (
        <div className="dashboard-container">

            <div className="dashboard-main">
                <DashboardOptions />
                <DashboardDisplay />
            </div>
        </div>
    );
}