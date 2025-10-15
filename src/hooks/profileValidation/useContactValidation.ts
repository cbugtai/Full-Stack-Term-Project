import { useState } from "react";
import { isValidEmail, isValidPhone } from "../../services/profileValidationService";

export function useContactValidation() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (email: string, phone?: string) => {
        const errs: Record<string, string> = {};
        if (!isValidEmail(email))
            errs.email = "Invalid email format.";
        if (phone && !isValidPhone(phone))
            errs.phone = "Invalid phone number.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    return { errors, validate };
}