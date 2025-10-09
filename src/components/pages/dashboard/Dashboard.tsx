import { mockUser } from "../../../apis/user/mockUserData";
import { DashboardOptions } from "./options/DashboardOptions";
import { DashboardDisplay } from "./display/DashboardDisplay";
import "./Dashboard.css";

export function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-name">{mockUser.name}'s Dashboard</h1>
            </div>
            <div className="dashboard-main">
                <DashboardOptions />
                <DashboardDisplay />
            </div>
        </div>
    );
}