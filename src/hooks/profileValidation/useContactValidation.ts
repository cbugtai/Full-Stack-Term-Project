import { useState } from "react";
import { isValidEmail, isValidPhone } from "@/services/profileValidationService";

export function useContactValidation() {
    const [errors, setErrors] = useState<{ email?: string; phone?: string; general?: string }>({});

    const validate = (email: string, phone: string) => {
        const newErrors: typeof errors = {};
        const hasEmail = email.trim().length > 0;
        const hasPhone = phone.trim().length > 0;

        if (!hasEmail && !hasPhone) {
            newErrors.general = "Please provide at least an email or phone number.";
        }

        if (hasEmail && !isValidEmail(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (hasPhone && !isValidPhone(phone)) {
            newErrors.phone = "Please enter a valid phone number.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { errors, validate };
}