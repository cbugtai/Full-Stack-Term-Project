import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/clerk-react";
import { UserCard } from "@/components/common/userCard/UserCard";
import "./Header.css";
import LogoHeader from "@/assets/logo-header.png";
import DefaultUser from "@/assets/default-user.png";

function Header() {
    const { user } = useUser();
    const [showCard, setShowCard] = useState(false);

    return (
        <>
            <header className="app-header">
                <div className="left-section">
                    <NavLink to="/" aria-label="Home">
                        <img
                            src={LogoHeader}
                            className="app-logo"
                            alt="RRC Marketplace Logo"
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
                        <SignedIn>
                            <div className="profile-actions">
                                <button
                                    className="profile-link"
                                    onClick={() => setShowCard(true)}
                                >
                                    <div className="profile-content">
                                        {user?.username || user?.primaryEmailAddress?.emailAddress}
                                        <img
                                            src={user?.imageUrl}
                                            className="profile-pic"
                                            alt={`${user?.username || "User"}'s profile picture`}
                                        />
                                    </div>
                                </button>

                                <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
                                    <button className="signout-btn">Sign out</button>
                                </SignOutButton>
                            </div>
                        </SignedIn>


                        <SignedOut>
                            <NavLink to="/sign-in" className="profile-link">
                                <div className="profile-content">
                                    Login
                                <img
                                    src={DefaultUser}
                                    className="profile-pic"
                                    alt={`${user?.username || "User"}'s profile picture`}
                                />
                                </div>
                            </NavLink>
                        </SignedOut>
                    </div>
                </div>
            </header>

            {showCard && <UserCard onClose={() => setShowCard(false)} />}
        </>
    );
}

export default Header;