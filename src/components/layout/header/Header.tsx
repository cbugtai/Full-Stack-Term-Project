import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./Header.css";
import type { User } from "../../../types/userSchema";
import { mockUser } from "../../../apis/testimonials/mockUserData";

const isLoggedIn = true;
const user: User | null = isLoggedIn ? mockUser : null;

function Header() {
    return (
        <header className="app-header">
            <div className="left-section">
                <img
                    src="/src/assets/logo-header.png"
                    className="app-logo"
                    alt="RRC Discount Ebay logo"
                />
            </div>

            <div className="center-section">
                <h1 className="app-title">RRC Discount Ebay</h1>
            </div>

            <div className="right-section">
                <NavLink 
                    to="/"
                    className={({ isActive }) => isActive ? "active" : ""}
                    aria-label="Home">
                    <FaHome className="home-icon" />
                </NavLink>

                <div className="user-info">
                    {user ? (
                    <>
                        <NavLink
                            to="/dashboard"
                            className="username">
                            {user.name}
                        </NavLink>
                        <img
                            src={user.profilePic}
                            className="profile-pic"
                            alt={`${user.name}'s profile picture`}
                        />
                    </>
                    ) : (
                    <>
                        <NavLink
                            to="/login"
                            className="login-link">
                            Login
                        </NavLink>
                        <img
                            src="/src/assets/default-user.png"
                            className="profile-pic"
                            alt="Default user profile icon"
                        />
                    </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;