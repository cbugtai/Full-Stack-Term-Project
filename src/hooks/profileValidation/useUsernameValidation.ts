import { useState } from "react";
import { isValidUsername, containsProfanity } from "../../services/profileValidationService";

export function useUsernameValidation() {
    const [error, setError] = useState<string | null>(null);

    const validate = async (username: string) => {
        if (!isValidUsername(username)) {
            setError("Username must be 3–20 chars, letters/numbers/underscores only.");
            return false;
        }
        if (containsProfanity(username)) {
            setError("Username contains inappropriate language.");
            return false;
        }
        setError(null);
        return true;
    };

    return { error, validate };
}