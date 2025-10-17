import { useState } from "react";
import { isValidBio, containsProfanity } from "../../services/profileValidationService";

export function useBioValidation() {
    const [error, setError] = useState<string | null>(null);

    const validate = (bio: string) => {
        if (!isValidBio(bio)) {
            setError("Bio must be between 1 and 500 characters.");
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