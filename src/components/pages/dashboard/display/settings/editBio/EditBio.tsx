import { DashboardDisplay } from "../../DashboardDisplay";
import "../Settings.css";

export function EditBio() {
    return (
        <DashboardDisplay
            heading="Edit Bio"
            intro="Write a short bio to personalize your profile and share a bit about yourself."
        >
            <form className="form-wrapper">
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" name="bio" rows={5} placeholder="Tell us about yourself..." />
                </div>

                <div className="form-actions">
                    <button type="submit">Save Bio</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}