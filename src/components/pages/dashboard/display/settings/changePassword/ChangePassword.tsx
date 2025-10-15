import { DashboardDisplay } from "../../DashboardDisplay";
import "../Settings.css";

export function ChangePassword() {
    return (
        <DashboardDisplay
            heading="Change Password"
            intro="Update your account password to keep your profile secure."
        >
            <form className="form-wrapper">
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="password" id="currentPassword" name="currentPassword" required />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" required />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />
                </div>

                <div className="form-actions">
                    <button type="submit">Update Password</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}