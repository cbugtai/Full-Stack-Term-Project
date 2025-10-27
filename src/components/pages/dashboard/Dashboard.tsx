import { Sidebar } from './sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './Dashboard.css';

export function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-main">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}