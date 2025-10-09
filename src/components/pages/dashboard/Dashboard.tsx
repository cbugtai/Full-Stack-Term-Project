import { mockUser } from "../../../apis/user/mockUserData";

export function Dashboard() {
    return (
        <div className="dashboard-container">
            <h1>{mockUser.name}'s Dashboard</h1>

            <section className="dashboard-options">
                <h2>Options</h2>
                <ul>
                    <li><button>Settings</button></li>
                    <li><button>Listing History</button></li>
                </ul>
            </section>

            <section className="dashboard-display">
                <h2>Display</h2>
                <button>Create User Dashboard</button>
            </section>

            <section className="dashboard-contents">
                <h2>User Dashboard Contents</h2>

                <div className="settings-section">
                <h3>Settings</h3>
                <ul>
                    <li>Change Username</li>
                    <li>Change Password</li>
                    <li>Change Profile Picture</li>
                    <li>Edit Bio</li>
                    <li>Manage Contact Information</li>
                </ul>
                </div>

                <div className="listing-history-section">
                <h3>Listing History</h3>
                <ul>
                    <li>View current listings</li>
                    <li>Remove listings</li>
                    <li>View past listings</li>
                </ul>
                </div>
            </section>
        </div>
    );
}