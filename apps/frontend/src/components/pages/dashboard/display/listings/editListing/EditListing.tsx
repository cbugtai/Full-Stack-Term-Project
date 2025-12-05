import { useState, useEffect } from "react";
import type { Listing } from "@/types/listing/listingModel";
import type { Brand, Category, Condition } from "../../../../../../../../../shared/types/metaTypes";
import Portal from "@/components/common/drawer/Portal";
import { updateListing } from "@/apis/listing/listingRepo";
import { useListingValidation } from "@/hooks/useListingValidation";
import { getBrands, getCategories, getConditions } from "@/apis/meta/metaRepo";
import "../ListingPortal.css";

type EditListingProps = {
    listing: Listing;
    onClose: () => void;
    onUpdate: (updated: Listing) => void;
};

export function EditListing({ listing, onClose, onUpdate }: EditListingProps) {
    const [formData, setFormData] = useState({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        categoryId: listing.categoryId,
        conditionId: listing.conditionId,
        brandId: listing.brandId ?? 0,
        city: listing.city ?? "",
        image: null as File | null,
        isNegotiable: listing.isNegotiable ?? false,
        isFree: listing.isFree ?? false,
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [conditions, setConditions] = useState<Condition[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(listing.imageUrl ?? null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { errors, validate } = useListingValidation();

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const [catRes, condRes, brandRes] = await Promise.all([
                    getCategories(),
                    getConditions(),
                    getBrands(),
                ]);
                setCategories(catRes);
                setConditions(condRes);
                setBrands(brandRes);
            } catch (err) {
                console.error("Failed to load meta options:", err);
            }
        };
        fetchMeta();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, type, value, checked } = e.target as HTMLInputElement;
        let newValue: string | number | boolean = value;

        if (type === "checkbox") newValue = checked;
        if (type === "number") newValue = parseFloat(value);

        setFormData((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFormData((prev) => ({ ...prev, image: file }));

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(listing.imageUrl ?? null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const pricing = formData.isFree ? "free" : formData.isNegotiable ? "negotiable" : "standard";
        if (!validate(formData, pricing, listing.imageUrl)) return;

        setIsSubmitting(true);

        try {
            const payload: Partial<Listing> = {
                title: formData.title,
                description: formData.description,
                price: pricing === "free" ? 0 : formData.price,
                categoryId: formData.categoryId,
                conditionId: formData.conditionId,
                brandId: formData.brandId,
                city: formData.city,
                isNegotiable: formData.isNegotiable,
                isFree: formData.isFree,
            };

            const updated = await updateListing(listing.id, payload);

            onUpdate(updated);
            onClose();
        } catch (err) {
            console.error("Error updating listing:", err);
            alert("Failed to update listing.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Portal>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Edit Listing</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            autoFocus
                        />
                        {errors.title && <p className="form-error">{errors.title}</p>}

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                        {errors.description && <p className="form-error">{errors.description}</p>}

                        {!formData.isFree && (
                            <input
                                type="number"
                                name="price"
                                value={formData.price || ""}
                                onChange={handleChange}
                                placeholder="Price"
                            />
                        )}
                        {errors.price && <p className="form-error">{errors.price}</p>}

                        <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
                            <option value={0}>Select Category</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.categoryId && <p className="form-error">{errors.categoryId}</p>}

                        <select name="conditionId" value={formData.conditionId} onChange={handleChange}>
                            <option value={0}>Select Condition</option>
                            {conditions.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.conditionId && <p className="form-error">{errors.conditionId}</p>}

                        <select name="brandId" value={formData.brandId} onChange={handleChange}>
                            <option value={0}>Select Brand</option>
                            {brands.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                        {errors.brandId && <p className="form-error">{errors.brandId}</p>}

                        <input name="city" value={formData.city} onChange={handleChange} placeholder="City" />

                        <label>
                            <input
                                type="checkbox"
                                name="isNegotiable"
                                checked={formData.isNegotiable}
                                onChange={handleChange}
                            />
                            Negotiable
                        </label>

                        <label>
                            <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleChange} />
                            Free
                        </label>

                        <div className="form-group">
                            <label htmlFor="imageUpload">Upload Photo</label>
                            <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
                            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                            {errors.image && <p className="form-error">{errors.image}</p>}
                        </div>

                        <div className="form-actions">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </button>
                            <button type="button" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Portal>
    );
}