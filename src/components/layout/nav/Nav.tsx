import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="nav-bar">
      <ul className="nav-items">
        <li>
          <NavLink
            to="/wishlist"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Wish List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sellers"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Sellers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
