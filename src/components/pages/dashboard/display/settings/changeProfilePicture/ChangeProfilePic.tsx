import { DashboardDisplay } from "../../DashboardDisplay";
import { useProfilePictureValidation } from "../../../../../../hooks/profileValidation/useProfilePictureValidation";
import "../Settings.css";

export function ChangeProfilePicture() {
    const { error, validate } = useProfilePictureValidation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fileInput = (e.target as HTMLFormElement).profilePicture;
        const file = fileInput.files?.[0] || null;

        if (validate(file)) {
            // Upload logic here
        }
    };

    return (
        <DashboardDisplay heading="Change Profile Picture" intro="Upload a new profile image to personalize your account.">
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="profilePicture" className="custom-file-label">Upload Image</label>
                    <input type="file" id="profilePicture" accept="image/*" className="hidden-file-input" />
                    {error && <p className="form-error">{error}</p>}
                </div>

                <div className="form-actions">
                    <button type="submit">Upload</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}