import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useMockUser } from "@/hooks/useMockUser";
import { UserCard } from "@/components/common/userCard/UserCard";
import "./Header.css";

function Header() {
    const { user, loading } = useMockUser();
    const [showCard, setShowCard] = useState(false);

    return (
        <>
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
                        className={({ isActive }) => (isActive ? "active" : "")}
                        aria-label="Home"
                    >
                        <FaHome className="home-icon" />
                    </NavLink>

                    <div className="user-info">
                        {loading ? null : user ? (
                        <button className="profile-link" onClick={() => setShowCard(true)}>
                            <div className="profile-content">
                                {user.username}
                                <img
                                    src={user.profilePic}
                                    className="profile-pic"
                                    alt={`${user.username}'s profile picture`}
                                />
                                </div>
                            </button>
                            ) : (
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
                        )}
                    </div>
                </div>
            </header>

            {showCard && user && (
                <UserCard user={user} onClose={() => setShowCard(false)} />
            )}
        </>
    );
}

export default Header;