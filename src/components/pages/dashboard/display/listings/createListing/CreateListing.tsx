import { useState } from "react";
import { CategoryOptions } from "../CatagoryOptions";
import { ConditionOptions } from "../ConditionOptions";
import { generateId } from "@/utils/generateId";
import { saveListing } from "@/apis/listing/listingRepo";
import { saveListingImage } from "@/apis/listing/listingImageRepo";
import { useListingValidation } from "@/hooks/useListingValidation";
import { useUser } from "@/context/userContext";
import type { Category } from "@/types/listing/catagory";
import type { Condition } from "@/types/listing/condition";
import Portal from "@/components/common/drawer/Portal";
import "../ListingPortal.css";

export function CreateListing({ onClose }: { onClose: () => void }) {
    const { user } = useUser();
    const { refreshListings } = useUser();
    const { errors, validate } = useListingValidation();
    const [pricing, setPricing] = useState("standard");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        price: number;
        category: Category;
        condition: Condition;
        city: string;
        image: File | null;
    }>({
        title: "",
        description: "",
        price: 0,
        category: "" as Category,
        condition: "" as Condition,
        city: "",
        image: null,
    });

    const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPricing(value);
        if (value === "free") {
            setFormData((prev) => ({ ...prev, price: 0 }));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? (value === "" ? 0 : parseFloat(value)) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("No user found. Please log in.");
            return;
        }

        if (!validate(formData, pricing)) return;

        setIsSubmitting(true);

        const id = generateId("listing");
        const status = "active" as "active" | "sold";

        try {
            await saveListingImage(id, formData.image!);

            const listing = {
                id,
                userId: user.id,
                title: formData.title,
                description: formData.description,
                category: formData.category,
                condition: formData.condition,
                price: pricing === "free" ? 0 : formData.price,
                isWishlisted: false,
                createdAt: new Date().toISOString(),
                status,
                city: formData.city,
                isNegotiable: pricing === "negotiable",
                isFree: pricing === "free",
            };

            await saveListing(listing);
            await refreshListings();

            setFormData({
                title: "",
                description: "",
                price: 0,
                category: "" as Category,
                condition: "" as Condition,
                city: "",
                image: null,
            });
            setImagePreview(null);
            setPricing("standard");

            onClose();
        } catch (err) {
            console.error("Error saving listing:", err);
            alert("Something went wrong while saving your listing.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Portal>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Create New Listing</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <p className="form-error">{errors.title}</p>}
                        
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && <p className="form-error">{errors.description}</p>}
                        
                        {pricing !== "free" && (
                            <input
                                type="number"
                                name="price"
                                placeholder={formData.price ? "Price" : "Pricing"}
                                value={formData.price || ""}
                                onChange={handleChange}
                            />
                        )}
                        {errors.price && <p className="form-error">{errors.price}</p>}

                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="">Select Category</option>
                            {CategoryOptions.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <p className="form-error">{errors.category}</p>}

                        <select name="condition" value={formData.condition} onChange={handleChange}>
                            <option value="">Select Condition</option>
                            {ConditionOptions.map((cond) => (
                                <option key={cond} value={cond}>{cond}</option>
                            ))}
                        </select>
                        {errors.condition && <p className="form-error">{errors.condition}</p>}

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && <p className="form-error">{errors.city}</p>}

                        <div className="radio-group">
                            <label className="radio-wrapper">
                                <input
                                    type="radio"
                                    name="pricing"
                                    value="standard"
                                    checked={pricing === "standard"}
                                    onChange={handlePricingChange}
                                /> Set a Price
                            </label>
                            <label className="radio-wrapper">
                                <input
                                    type="radio"
                                    name="pricing"
                                    value="negotiable"
                                    checked={pricing === "negotiable"}
                                    onChange={handlePricingChange}
                                /> Negotiable
                            </label>
                            <label className="radio-wrapper">
                                <input
                                    type="radio"
                                    name="pricing"
                                    value="free"
                                    checked={pricing === "free"}
                                    onChange={handlePricingChange}
                                /> Free
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
                                onChange={handleImageUpload}
                                className="hidden-file-input"
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="image-preview" />
                            )}
                            {errors.image && <p className="form-error">{errors.image}</p>}
                        </div>

                        <div className="form-actions">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create Listing"}
                            </button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </Portal>
    );
}