import { DashboardDisplay } from "../../DashboardDisplay";
import { useDeleteAccountValidation } from "../../../../../../hooks/profileValidation/useDeleteAccountValidation";
import "../Settings.css";

export function DeleteAccount() {
    const { error, validate } = useDeleteAccountValidation();

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        const confirmation = (e.target as HTMLFormElement).confirmation.value;

        if (validate(confirmation)) {
            // Delete logic here
        }
    };

    return (
        <DashboardDisplay heading="Delete Account" intro="Permanently remove your account and all associated data.">
            <form className="form-wrapper" onSubmit={handleDelete}>
                <div className="delete-account-warning">
                    <p>This action is irreversible. Please confirm below.</p>
                </div>

                <div className="form-group">
                    <input type="text" name="confirmation" placeholder="Type DELETE to confirm" required />
                    {error && <p className="form-error">{error}</p>}
                </div>

                <div className="form-actions">
                    <button className="danger" type="submit">Delete My Account</button>
                </div>
            </form>
        </DashboardDisplay>
    );
}