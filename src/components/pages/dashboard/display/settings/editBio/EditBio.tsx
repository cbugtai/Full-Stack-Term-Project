import { DashboardDisplay } from "../../DashboardDisplay";
import { useBioValidation } from "../../../../../../hooks/profileValidation/useBioValidation";
import "../Settings.css";

export function EditBio() {
    const { error, validate } = useBioValidation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const bio = (e.target as HTMLFormElement).bio.value;

        if (validate(bio)) {
            // Save logic here
        }
    };

    return (
        <DashboardDisplay heading="Edit Bio" intro="Write a short bio to personalize your profile and share a bit about yourself.">
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" name="bio" rows={5} placeholder="Tell us about yourself..." />
                    {error && <p className="form-error">{error}</p>}
                </div>

                <div className="form-actions">
                    <button type="submit">Save Bio</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}