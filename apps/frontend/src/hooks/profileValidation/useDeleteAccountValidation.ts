import { useState } from "react";

export function useDeleteAccountValidation() {
    const [error, setError] = useState<string | null>(null);

    const validate = (confirmation: string) => {
        if (confirmation !== "DELETE") {
            setError("You must type DELETE to confirm.");
            return false;
        }
        setError(null);
        return true;
    };

    return { error, validate };
}