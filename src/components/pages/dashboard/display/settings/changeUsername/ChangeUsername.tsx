import { DashboardDisplay } from "../../DashboardDisplay";
import "../Settings.css";

export function ChangeUsername() {
    return (
        <DashboardDisplay
            heading="Change Username"
            intro="Update your display name as it appears across the platform."
        >
            <form className="form-wrapper">
                <div className="form-group">
                    <label htmlFor="newUsername">New Username</label>
                    <input type="text" id="newUsername" name="newUsername" required />
                </div>

                <div className="form-actions">
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}