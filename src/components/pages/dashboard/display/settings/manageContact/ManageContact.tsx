import { DashboardDisplay } from "../../DashboardDisplay";
import "../Settings.css";

export function ManageContact() {
    return (
        <DashboardDisplay
            heading="Manage Contact Information"
            intro="Keep your email and phone number up to date for account recovery and notifications."
        >
            <form className="form-wrapper">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" />
                </div>

                <div className="form-actions">
                    <button type="submit">Update Contact Info</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}