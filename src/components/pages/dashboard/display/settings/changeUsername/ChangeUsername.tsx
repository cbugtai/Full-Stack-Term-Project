import { DashboardDisplay } from "../../DashboardDisplay";
import { useUsernameValidation } from "../../../../../../hooks/profileValidation/useUsernameValidation";
import "../Settings.css";

export function ChangeUsername() {
    const { error, validate } = useUsernameValidation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const username = (e.target as HTMLFormElement).newUsername.value;

        if (await validate(username)) {
            // Save logic here
        }
    };

    return (
        <DashboardDisplay heading="Change Username" intro="Update your display name as it appears across the platform.">
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="newUsername">New Username</label>
                    <input type="text" id="newUsername" name="newUsername" required />
                    {error && <p className="form-error">{error}</p>}
                </div>

                <div className="form-actions">
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}