import { NavLink } from "react-router-dom";

export function SellersNav() {
  return (
    <nav className="sellers-nav-bar">
      <ul className="nav-items">
        <li>
          <NavLink
            to="/sellers"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            All Sellers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorite-sellers"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Favorite Sellers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blocked-sellers"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Blocked Sellers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

