import { useState } from "react";
import {
    isValidTitle,
    isValidDescription,
    isValidPrice,
    isValidCity,
} from "@/services/listingValidationService";
import { containsProfanity } from "@/services/containsProfanity";

type ListingErrors = {
    title?: string;
    description?: string;
    price?: string;
    category?: string;
    condition?: string;
    city?: string;
    image?: string;
};

export function useListingValidation() {
    const [errors, setErrors] = useState<ListingErrors>({});

    const validate = (
        listing: {
            title: string;
            description: string;
            price: number;
            category: string;
            condition: string;
            city: string;
            image: File | null;
        },
        pricing: string,
        existingImageUrl?: string
    ) => {
        const newErrors: ListingErrors = {};

        if (!isValidTitle(listing.title)) {
            newErrors.title = "Title must be 3–100 characters.";
        } else if (containsProfanity(listing.title)) {
            newErrors.title = "Title contains inappropriate language.";
        }

        if (!isValidDescription(listing.description)) {
            newErrors.description = "Description must be 10–1000 characters.";
        } else if (containsProfanity(listing.description)) {
            newErrors.description = "Description contains inappropriate language.";
        }

        if (pricing !== "free") {
            if (!isValidPrice(listing.price)) {
                newErrors.price = "Price must be between $0 and $1,000,000 with up to 2 decimal places.";
            }
        }

        if (!listing.category) {
            newErrors.category = "Please select a category.";
        }

        if (!listing.condition) {
            newErrors.condition = "Please select a condition.";
        }

        if (listing.city && !isValidCity(listing.city)) {
            newErrors.city = "City name must be 2-50 letters.";
        }

        if (!listing.image && !existingImageUrl) {
            newErrors.image = "Please upload an image.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { errors, validate };
}