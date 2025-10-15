import { useState } from "react";
import { isStrongPassword } from "../../services/profileValidationService";

export function useChangePasswordValidation() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (current: string, newPass: string, confirm: string) => {
        const errs: Record<string, string> = {};
        if (newPass === current)
            errs.newPass = "New password must differ from current.";
        if (!isStrongPassword(newPass))
            errs.newPass = "Password must be stronger.";
        if (newPass !== confirm)
            errs.confirm = "Passwords do not match.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    return { errors, validate };
}
