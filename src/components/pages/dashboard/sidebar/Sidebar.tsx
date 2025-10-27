import ChevronRight from "@/assets/icons/ChevronRight.svg?react";
import ChevronLeft from "@/assets/icons/ChevronLeft.svg?react";
import { useState } from "react";
import { DashboardOptions } from "../options/DashboardOptions";
import "./Sidebar.css";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="sidebar-wrapper">
            <div className={`sidebar ${isOpen ? "visible" : "hidden"}`}>
                <div className="sidebar-content">
                    <DashboardOptions />
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