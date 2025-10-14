import { useState } from 'react';
import { DASHBOARD_OPTIONS } from './display/DashboardDisplay';
import { Sidebar } from './sidebar/Sidebar';
import { RenderDisplay } from './display/DashboardDisplay';
import './Dashboard.css';

export function Dashboard() {
    const [selectedOption, setSelectedOption] = useState<keyof typeof DASHBOARD_OPTIONS | null>(null);

    return (
        <div className="dashboard-container">
            <div className="dashboard-main">
                <Sidebar onSelect={setSelectedOption} />
                <RenderDisplay selectedOption={selectedOption} />
            </div>
        </div>
    );
}