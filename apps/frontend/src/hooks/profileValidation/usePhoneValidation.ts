import { useState } from "react";
import { isValidPhone } from "@/services/profileValidationService";

export function usePhoneValidation() {
    const [error, setError] = useState<string | null>(null);

    const validate = (phone: string) => {
        if (!isValidPhone(phone)) {
            setError("Please enter a valid phone number.");
            return false;
        }
        setError(null);
        return true;
    };

    return { error, validate };
}