import { useState } from "react";
import {
    isValidTitle,
    isValidDescription,
    isValidPrice,
    isValidCity,
} from "@/services/listingValidationService";
import { containsProfanity } from "@/services/containsProfanity";
import type { ListingFormData } from "@/types/listing/listingFormData";

type ListingErrors = {
    title?: string;
    description?: string;
    price?: string;
    categoryId?: string;
    conditionId?: string;
    brandId?: string;
    statusId?: string;
    city?: string;
    image?: string;
};

export function useListingValidation() {
    const [errors, setErrors] = useState<ListingErrors>({});

    const validate = (
        listing: ListingFormData,
        pricing: "standard" | "negotiable" | "free",
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

        if (pricing !== "free" && !isValidPrice(listing.price)) {
            newErrors.price = "Price must be between $0 and $1,000,000.";
        }

        if (!listing.categoryId) newErrors.categoryId = "Please select a category.";
        if (!listing.conditionId) newErrors.conditionId = "Please select a condition.";
        if (!listing.brandId) newErrors.brandId = "Please select a brand.";

        if (listing.city && !isValidCity(listing.city)) {
            newErrors.city = "City name must be 2–50 letters.";
        }

        if (!listing.image && !existingImageUrl) {
            newErrors.image = "Please upload an image.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { errors, validate };
}