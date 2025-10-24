import { useState } from "react";
import { isStrongPassword } from "../../services/profileValidationService";

export function useChangePasswordValidation() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (current: string, newPass: string) => {
        const errs: Record<string, string> = {};
        if (newPass === current && !isStrongPassword(newPass)) {
            errs.newPass = "New password must differ from current and be stronger.";
        } else {
            if (newPass === current)
                errs.newPass = "New password must differ from current.";
            else if (!isStrongPassword(newPass))
                errs.newPass = "Password must be stronger.";
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    return { errors, validate };
}
