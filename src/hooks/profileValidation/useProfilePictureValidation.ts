import { useState } from "react";

const MAX_SIZE_MB = 5;

export function useProfilePictureValidation() {
    const [error, setError] = useState<string | null>(null);

    const validate = (file: File | null) => {
        if (!file) {
            setError("No file selected.");
            return false;
        }
        if (!file.type.startsWith("image/")) {
            setError("File must be an image.");
            return false;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setError("Image exceeds 5MB limit.");
            return false;
        }
        setError(null);
        return true;
    };

    return { error, validate };
}