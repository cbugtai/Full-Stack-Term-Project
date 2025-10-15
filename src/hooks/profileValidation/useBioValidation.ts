import { useState } from "react";
import { containsProfanity } from "../../services/profileValidationService";

export function useBioValidation() {
    const [error, setError] = useState<string | null>(null);

    const validate = (bio: string) => {
        if (bio.length > 500) {
            setError("Bio must be under 500 characters.");
            return false;
        }
        if (containsProfanity(bio)) {
            setError("Bio contains inappropriate language.");
            return false;
        }
        setError(null);
        return true;
    };

    return { error, validate };
}