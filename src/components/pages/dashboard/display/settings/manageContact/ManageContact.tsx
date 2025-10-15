import { DashboardDisplay } from "../../DashboardDisplay";
import { useContactValidation } from "../../../../../../hooks/profileValidation/useContactValidation";
import "../Settings.css";

export function ManageContact() {
    const { errors, validate } = useContactValidation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.email.value;
        const phone = form.phone.value;

        if (validate(email, phone)) {
            // Update logic here
        }
    };

    return (
        <DashboardDisplay heading="Manage Contact Information" intro="Keep your email and phone number up to date for account recovery and notifications.">
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>

                <div className="form-actions">
                    <button type="submit">Update Contact Info</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}