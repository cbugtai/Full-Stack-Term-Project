import { DashboardDisplay } from "../../DashboardDisplay";
import "../Settings.css";

export function DeleteAccount() {
    return (
        <DashboardDisplay
            heading="Delete Account"
            intro="Permanently remove your account and all associated data."
        >
            <div className="form-wrapper">
                <div className="delete-account-warning">
                    <p>This action is irreversible. Please confirm below.</p>
                </div>

                <div className="form-actions">
                    <button className="danger" type="button">Delete My Account</button>
                </div>
            </div>
        </DashboardDisplay>
    );
}