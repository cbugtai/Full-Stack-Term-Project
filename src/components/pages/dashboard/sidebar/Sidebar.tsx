import ChevronRight from "@/assets/icons/ChevronRight.svg?react";
import ChevronLeft from "@/assets/icons/ChevronLeft.svg?react";
import { useState } from "react";
import { DashboardOptions } from "../options/DashboardOptions";
import { DASHBOARD_OPTIONS } from "../display/DashboardDisplay";
import "./Sidebar.css";


export function Sidebar({ onSelect }: {
    onSelect: (option: keyof typeof DASHBOARD_OPTIONS) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="sidebar-wrapper">
            <div className={`sidebar ${isOpen ? "visible" : "hidden"}`}>
                <div className="sidebar-content">
                <DashboardOptions onSelect={onSelect} />
                </div>
            </div>
            <button
                className={`sidebar-toggle ${isOpen ? "attached" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </button>
        </div>
    );
}