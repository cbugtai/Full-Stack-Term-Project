import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./Header.css";

const mockUser = {
    name: "Mock User",
    profilePic: "/src/assets/default-user.png",
};

const isLoggedIn = true;
const user = isLoggedIn ? mockUser : null;

function Header() {
    return (
        <header className="app-header">
            <div className="left-section">
                <img src="/src/assets/logo-header.png" className="app-logo" />
            </div>

            <div className="center-section">
                <h1 className="app-title">RRC Discount Ebay</h1>
            </div>

            <div className="right-section">
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaHome className="home-icon" />
                </NavLink>

                <div className="user-info">
                    {user ? (
                    <>
                        <NavLink to="/dashboard" className="username">{user.name}</NavLink>
                        <img src={user.profilePic} className="profile-pic" />
                    </>
                    ) : (
                    <>
                        <NavLink to="/login" className="login-link">Login</NavLink>
                        <img src="/src/assets/default-user.png" className="profile-pic" />
                    </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;