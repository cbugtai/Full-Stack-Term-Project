import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Portal from "@/components/common/drawer/Portal";
import { useListingValidation } from "@/hooks/useListingValidation";
import type { MetaOption } from "../../../../../../../../../shared/types/metaTypes";
import type { ListingFormData } from "@/types/listing/listingFormData";
import { createListing, CreateListingPayload } from "@/apis/listing/listingRepo";
import "../ListingPortal.css";

type CreateListingProps = { onClose: () => void };

export function CreateListing({ onClose }: CreateListingProps) {
    const { user } = useUser();
    const { errors, validate } = useListingValidation();

    const [formData, setFormData] = useState<ListingFormData>({
        title: "",
        description: "",
        price: 0,
        categoryId: 0,
        conditionId: 0,
        brandId: 0,
        city: "",
        image: null,
        isNegotiable: false,
        isFree: false,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [categories, setCategories] = useState<MetaOption[]>([]);
    const [conditions, setConditions] = useState<MetaOption[]>([]);
    const [brands, setBrands] = useState<MetaOption[]>([]);
    const [statuses, setStatuses] = useState<MetaOption[]>([]);

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const [catRes, condRes, brandRes, statusRes] = await Promise.all([
                    fetch("/api/v1/meta/categories"),
                    fetch("/api/v1/meta/conditions"),
                    fetch("/api/v1/meta/brands"),
                    fetch("/api/v1/meta/statuses"),
                ]);

                setCategories(await catRes.json());
                setConditions(await condRes.json());
                setBrands(await brandRes.json());
                setStatuses(await statusRes.json());
            } catch (err) {
                console.error("Failed to load meta options:", err);
            }
        };
        fetchMeta();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, type } = target;
        let value: string | number | boolean = target.value;

        if (type === "checkbox") value = target.checked;
        if (type === "number") value = parseFloat(target.value);

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFormData((prev) => ({ ...prev, image: file }));

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            price: 0,
            categoryId: 0,
            conditionId: 0,
            brandId: 0,
            city: "",
            image: null,
            isNegotiable: false,
            isFree: false,
        });
        setImagePreview(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return alert("No user found. Please log in.");

        const pricing = formData.isFree
            ? "free"
            : formData.isNegotiable
            ? "negotiable"
            : "standard";

        if (!validate(formData, pricing)) return;

        setIsSubmitting(true);

        try {
            const activeStatus = statuses.find(s => s.name.toLowerCase() === "active");
            if (!activeStatus) throw new Error("Active status not found");

            const payload: CreateListingPayload = {
                sellerId: Number(user.id),
                title: formData.title,
                description: formData.description,
                price: formData.price,
                originalPrice: formData.price,
                categoryId: formData.categoryId,
                conditionId: formData.conditionId,
                brandId: formData.brandId,
                statusId: activeStatus.id,
                city: formData.city,
                isNegotiable: formData.isNegotiable,
                isFree: formData.isFree,
            };

            await createListing(payload, formData.image ?? undefined);
            resetForm();
            onClose();
        } catch (err) {
            console.error("Error creating listing:", err);
            alert("Failed to create listing.");
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

                        {!formData.isFree && (
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price || ""}
                                onChange={handleChange}
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

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && <p className="form-error">{errors.city}</p>}

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
                            <input
                                type="checkbox"
                                name="isFree"
                                checked={formData.isFree}
                                onChange={handleChange}
                            />
                            Free
                        </label>

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
                            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
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