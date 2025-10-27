import { useState } from "react";
import type { Listing } from "@/types/listing/listingModel";
import Portal from "@/components/common/drawer/Portal";
import { saveListing } from "@/apis/listing/listingRepo";
import { saveListingImage } from "@/apis/listing/listingImageRepo";
import { useListingValidation } from "@/hooks/useListingValidation";
import { CategoryOptions } from "../CatagoryOptions";
import { ConditionOptions } from "../ConditionOptions";
import "../ListingPortal.css";

export function EditListing({
    listing,
    onClose,
    onUpdate,
}: {
    listing: Listing;
    onClose: () => void;
    onUpdate: (updated: Listing) => void;
}) {
    const [formData, setFormData] = useState({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        category: listing.category,
        condition: listing.condition,
        city: listing.city ?? "",
        image: null as File | null,
    });

    const [pricing, setPricing] = useState(() => {
        if (listing.isFree) return "free";
        if (listing.isNegotiable) return "negotiable";
        return "standard";
    });

    const { errors, validate } = useListingValidation();
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handlePricingChange = (value: string) => {
        setPricing(value);
        if (value === "free") {
            handleChange("price", 0);
        } else if (formData.price === 0) {
            handleChange("price", listing.price);
        }
    };

    const handleSubmit = async () => {
        const isValid = validate(formData, pricing, listing.imageUrl);
        if (!isValid) return;

        setSubmitting(true);

        try {
            const updatedListing: Listing = {
                ...listing,
                ...formData,
                price: pricing === "free" ? 0 : formData.price,
                isFree: pricing === "free",
                isNegotiable: pricing === "negotiable",
                updatedAt: new Date().toISOString(),
            };

            await saveListing(updatedListing);

            if (formData.image) {
                await saveListingImage(listing.id, formData.image);
            }

            onUpdate(updatedListing);
            onClose();
        } catch (err) {
            console.error("Error updating listing:", err);
            alert("Something went wrong while updating your listing.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Portal>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Edit Listing</h2>

                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Title"
                        autoFocus
                    />
                    {errors.title && <p className="form-error">{errors.title}</p>}

                    <textarea
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Description"
                    />
                    {errors.description && <p className="form-error">{errors.description}</p>}

                    {pricing !== "free" && (
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                            placeholder="Price"
                        />
                    )}
                    {errors.price && <p className="form-error">{errors.price}</p>}

                    <select
                        value={formData.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                    >
                        {CategoryOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="form-error">{errors.category}</p>}

                    <select
                        value={formData.condition}
                        onChange={(e) => handleChange("condition", e.target.value)}
                    >
                        {ConditionOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {errors.condition && <p className="form-error">{errors.condition}</p>}

                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="City"
                    />
                    {errors.city && <p className="form-error">{errors.city}</p>}

                    <div className="radio-group">
                        <label className="radio-wrapper">
                            <input
                                type="radio"
                                name="pricing"
                                value="standard"
                                checked={pricing === "standard"}
                                onChange={() => handlePricingChange("standard")}
                            />
                            Set a Price
                        </label>
                        <label className="radio-wrapper">
                            <input
                                type="radio"
                                name="pricing"
                                value="negotiable"
                                checked={pricing === "negotiable"}
                                onChange={() => handlePricingChange("negotiable")}
                            />
                            Negotiable
                        </label>
                        <label className="radio-wrapper">
                            <input
                                type="radio"
                                name="pricing"
                                value="free"
                                checked={pricing === "free"}
                                onChange={() => handlePricingChange("free")}
                            />
                            Free
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageUpload" className="custom-file-label">
                            Upload Photo
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                handleChange("image", file);
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImagePreview(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                } else {
                                    setImagePreview(null);
                                }
                            }}
                            className="hidden-file-input"
                        />
                        {!imagePreview && listing.imageUrl && (
                            <img src={listing.imageUrl} alt="Current image" className="image-preview" />
                        )}
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                        )}
                        {errors.image && <p className="form-error">{errors.image}</p>}
                    </div>

                    <div className="form-actions">
                        <button onClick={handleSubmit} disabled={submitting}>
                            {submitting ? "Saving..." : "Save Changes"}
                        </button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
}