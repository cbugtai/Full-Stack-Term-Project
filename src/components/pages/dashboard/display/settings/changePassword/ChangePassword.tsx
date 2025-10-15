import { DashboardDisplay } from "../../DashboardDisplay";
import { useChangePasswordValidation } from "../../../../../../hooks/profileValidation/useChangePasswordValidation";
import "../Settings.css";

export function ChangePassword() {
    const { errors, validate } = useChangePasswordValidation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const current = form.currentPassword.value;
        const newPass = form.newPassword.value;
        const confirm = form.confirmPassword.value;

        if (validate(current, newPass, confirm)) {
            // Submit logic here
        }
    };

    return (
        <DashboardDisplay heading="Change Password" intro="Update your account password to keep your profile secure.">
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="password" id="currentPassword" name="currentPassword" required />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" required />
                    {errors.newPass && <p className="form-error">{errors.newPass}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />
                    {errors.confirm && <p className="form-error">{errors.confirm}</p>}
                </div>

                <div className="form-actions">
                    <button type="submit">Update Password</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}