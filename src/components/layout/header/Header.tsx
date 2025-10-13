import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./Header.css";
import type { User } from "../../../types/userSchema";
import { mockUser } from "../../../apis/user/mockUserData";

const isLoggedIn = true;
const user: User | null = isLoggedIn ? mockUser : null;

function Header() {
    return (
        <header className="app-header">
            <div className="left-section">
                <NavLink to="/" aria-label="Home">
                    <img
                        src="/src/assets/logo-header.png"
                        className="app-logo"
                        alt="RRC Discount Ebay logo"
                    />
                </NavLink>
            </div>

            <div className="center-section">
                <NavLink to="/" className="app-title" aria-label="Home">
                    <h1 className="app-title">RRC Marketplace</h1>
                </NavLink>
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
                        <NavLink to="/dashboard" className="profile-link">
                            <div className="profile-content">
                                {user.name}
                                <img
                                    src={user.profilePic}
                                    className="profile-pic"
                                    alt={`${user.name}'s profile picture`}
                                />
                            </div>
                        </NavLink>
                    </>
                    ) : (
                    <>
                        <NavLink to="/login" className="profile-link">
                            <div className="profile-content">
                                Login             
                                <img
                                    src="/src/assets/default-user.png"
                                    className="profile-pic"
                                    alt="Default user profile icon"
                                />
                            </div>
                        </NavLink>
                    </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;