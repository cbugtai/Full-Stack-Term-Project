import { DashboardDisplay } from "../../DashboardDisplay";
import "../Settings.css";

export function ChangeProfilePicture() {
    return (
        <DashboardDisplay
            heading="Change Profile Picture"
            intro="Upload a new profile image to personalize your account."
        >
            <form className="form-wrapper">
                <div className="form-group">
                    <label htmlFor="profilePicture" className="custom-file-label">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        className="hidden-file-input"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit">Upload</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}