import { useState, useEffect, useCallback } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import Portal from "@/components/common/drawer/Portal";
import { useListingValidation } from "@/hooks/useListingValidation";
import type { MetaOption } from "../../../../../../../../../shared/types/metaTypes";
import type { ListingFormData } from "@/types/listing/listingFormData";
import { createListing, type CreateListingPayload } from "@/apis/listing/listingRepo";
import { getBrands, getCategories, getConditions, getStatuses } from "@/apis/meta/metaRepo";
import { getSellerForCurrentUser } from "@/apis/sellers/sellerRepo";
import "../ListingPortal.css";

type CreateListingProps = { onClose: () => void };

export function CreateListing({ onClose }: CreateListingProps) {
    const { user } = useUser();
    const { getToken } = useAuth();
    const { errors, validate } = useListingValidation();

    const [formData, setFormData] = useState<ListingFormData & { originalPrice?: number }>({
        title: "",
        description: "",
        price: 0,
        originalPrice: 0,
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

    const [metaOptions, setMetaOptions] = useState<{
        categories: MetaOption[];
        conditions: MetaOption[];
        brands: MetaOption[];
        statuses: MetaOption[];
    }>({ categories: [], conditions: [], brands: [], statuses: [] });

    const loadMeta = useCallback(async () => {
        try {
            const [categories, conditions, brands, statuses] = await Promise.all([
                getCategories(),
                getConditions(),
                getBrands(),
                getStatuses(),
            ]);

            setMetaOptions({
                categories: categories.map(c => ({ id: Number(c.id), name: c.name })),
                conditions: conditions.map(c => ({ id: Number(c.id), name: c.name })),
                brands: brands.map(b => ({ id: Number(b.id), name: b.name })),
                statuses: statuses.map(s => ({ id: Number(s.id), name: s.name })),
            });
        } catch (err) {
            console.error("Failed to load meta data:", err);
        }
    }, []);

    useEffect(() => {
        loadMeta();
    }, [loadMeta]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            setFormData(p => ({ ...p, [name]: (e.target as HTMLInputElement).checked }));
        } else if (type === "number") {
            setFormData(p => ({ ...p, [name]: Number(value) }));
        } else if (e.target instanceof HTMLSelectElement) {
            setFormData(p => ({ ...p, [name]: value ? Number(value) : 0 }));
        } else {
            setFormData(p => ({ ...p, [name]: value }));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFormData(p => ({ ...p, image: file }));
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            console.warn("User not found");
            return alert("User not found");
        }

        const pricingType = formData.isFree
        ? "free"
        : formData.isNegotiable
        ? "negotiable"
        : "standard";

        if (!validate(formData, pricingType)) {
            return;
        }

        try {
            setIsSubmitting(true);

            const token = await getToken();

            const seller = await getSellerForCurrentUser(token ?? undefined);
            if (!seller) {
                console.warn("Seller record not found");
                return alert("Seller record not found");
            }

            const activeStatus = metaOptions.statuses.find(
                s => s.name.toLowerCase() === "active"
            );
            if (!activeStatus) throw new Error("Active status not found");

            const payload: CreateListingPayload = {
                sellerId: seller.id,
                title: formData.title,
                description: formData.description,
                price: formData.price,
                originalPrice: formData.originalPrice ?? formData.price,
                categoryId: formData.categoryId,
                conditionId: formData.conditionId,
                brandId: formData.brandId,
                statusId: activeStatus.id,
                city: formData.city,
                isNegotiable: formData.isNegotiable,
                isFree: formData.isFree,
            };

            await createListing(payload, formData.image ?? undefined, token ?? undefined);

            setFormData({
                title: "",
                description: "",
                price: 0,
                originalPrice: 0,
                categoryId: 0,
                conditionId: 0,
                brandId: 0,
                city: "",
                image: null,
                isNegotiable: false,
                isFree: false,
            });
            setImagePreview(null);
            onClose();
        } catch (err: any) {
            console.error("Listing creation failed:", err);
            alert(`Failed to create listing: ${err.message ?? err}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderSelect = (
        field: "categoryId" | "conditionId" | "brandId",
        list: MetaOption[],
        label: string
    ) => (
        <select name={field} value={formData[field] || 0} onChange={handleChange}>
            <option value={0}>{label}</option>
            {list.map(opt => (
                <option key={opt.id} value={opt.id}>
                    {opt.name}
                </option>
            ))}
        </select>
    );

    return (
        <Portal>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h2>Create New Listing</h2>

                    <form onSubmit={handleSubmit}>
                        <input
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
                            <>
                                <input
                                    type="number"
                                    name="originalPrice"
                                    placeholder="Original Price (optional)"
                                    value={formData.originalPrice || ""}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={formData.price || ""}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        {errors.price && <p className="form-error">{errors.price}</p>}

                        {renderSelect("categoryId", metaOptions.categories, "Select Category")}
                        {renderSelect("conditionId", metaOptions.conditions, "Select Condition")}
                        {renderSelect("brandId", metaOptions.brands, "Select Brand")}

                        <input
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

                        <label className="custom-file-label" htmlFor="imageUpload">
                            Upload Image
                        </label>
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        {imagePreview && (
                            <img src={imagePreview} className="image-preview" alt="Preview" />
                        )}

                        <div className="form-actions">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create Listing"}
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