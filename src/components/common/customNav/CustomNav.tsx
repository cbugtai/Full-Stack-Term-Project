import { NavLink } from "react-router-dom";
import type { NavItem } from "@/types/navItem";
import "./CustomNav.css";

export function CustomNavBar({ items }: { items: NavItem[] }) {
    return (
        <nav className="custom-nav">
            {items.map(({ to, label, icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    {icon && <span className="nav-icon">{icon}</span>}
                    <span className="nav-label">{label}</span>
                </NavLink>
            ))}
        </nav>
    );
}