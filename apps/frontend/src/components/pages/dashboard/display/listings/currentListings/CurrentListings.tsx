import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { ListingsNav } from "../ListingsNav";
import { CreateListing } from "../createListing/CreateListing";
import { EditListing } from "../editListing/EditListing";
import ClipIcon from "@/assets/icons/ClipIcon.svg?react";
import AddIcon from "@/assets/icons/AddIcon.svg?react";
import PencilIcon from "@/assets/icons/PencilIcon.svg?react";
import TrashIcon from "@/assets/icons/TrashIcon.svg?react";

import { getListingsBySeller, updateListing } from "@/apis/listing/listingRepo";
import { getCategories, getConditions, getBrands, getStatuses } from "@/apis/meta/metaRepo";
import { getUser, saveUser } from "@/apis/user/userRepo";

import type { Listing } from "@/types/listing/listingModel";
import type { User } from "../../../../../../../../../shared/types/user";
import type { Category, Condition, Brand, Status } from "../../../../../../../../../shared/types/metaTypes";

import "../Listings.css";

export function CurrentListings() {
    const { user: clerkUser, isSignedIn } = useUser();
    const { getToken } = useAuth();

    const [backendUser, setBackendUser] = useState<User | null>(null);
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingListing, setEditingListing] = useState<Listing | null>(null);
    const [becomingSeller, setBecomingSeller] = useState(false);

    const [categories, setCategories] = useState<Category[]>([]);
    const [conditions, setConditions] = useState<Condition[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [statuses, setStatuses] = useState<Status[]>([]);

    const isSeller = backendUser?.isSeller;

    useEffect(() => {
        const fetchBackendUser = async () => {
        if (!clerkUser?.id) return;

        try {
            const token = await getToken({ template: "default" });
            if (!token) throw new Error("No session token");

            const data = await getUser(token);
            setBackendUser(data ?? null);
        } catch (err) {
            console.error("Failed to fetch backend user:", err);
        }
        };

        fetchBackendUser();
    }, [clerkUser?.id, getToken]);

    const refreshListings = async () => {
        if (!backendUser?.id || !isSeller) {
            setListings([]);
            setLoading(false);
            return;
        }

        try {
            const sellerListings = await getListingsBySeller(Number(backendUser.id));
            setListings(sellerListings);
        } catch (err) {
            console.error("Failed to fetch listings:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMeta = async () => {
        try {
            const [catRes, condRes, brandRes, statusRes] = await Promise.all([
                getCategories(),
                getConditions(),
                getBrands(),
                getStatuses(),
            ]);
            setCategories(catRes);
            setConditions(condRes);
            setBrands(brandRes);
            setStatuses(statusRes);
        } catch (err) {
            console.error("Failed to load meta options:", err);
        }
    };

    useEffect(() => {
        refreshListings();
        fetchMeta();
    }, [backendUser?.id, isSeller]);

    const getCategoryName = (id: number) => categories.find(c => c.id === id)?.name ?? "Uncategorized";
    const getConditionName = (id: number) => conditions.find(c => c.id === id)?.name ?? "Unknown";
    const getBrandName = (id?: number) => id ? brands.find(b => b.id === id)?.name ?? "Unknown" : "Unknown";
    const getStatusName = (id: number) => statuses.find(s => s.id === id)?.name ?? "Unknown";

    const activeListings = listings.filter(l => getStatusName(l.statusId).toLowerCase() === "active");

    const handleMarkAsSold = async (listing: Listing) => {
        const soldStatus = statuses.find(s => s.name.toLowerCase() === "sold");
        if (!soldStatus) return alert("Sold status not found");

        try {
            await updateListing(listing.id, { statusId: soldStatus.id });
            refreshListings();
        } catch (err) {
            console.error("Failed to mark listing as sold:", err);
        }
    };

    const handleBecomeSeller = async () => {
        if (!backendUser) return;
        setBecomingSeller(true);

        try {
            const token = await getToken({ template: "default" });
            if (!token) throw new Error("No session token");

            await saveUser({ isSeller: true }, token);
            const updated = await getUser(token);
            setBackendUser(updated);
        } catch (err) {
            console.error("Failed to become a seller:", err);
        } finally {
            setBecomingSeller(false);
        }
    };

    if (!isSignedIn) {
        return (
            <DashboardDisplay
                heading="Current Listings"
                intro="You must be signed in to view your listings."
                icon={<ClipIcon className="icon" />}
                disableGrid
            >
                <p>Please <a href="/sign-in">sign in</a> to manage your listings.</p>
            </DashboardDisplay>
        );
    }

    if (!isSeller) {
        return (
            <DashboardDisplay
                heading="Current Listings"
                intro="You need to become a seller to create or manage listings."
                icon={<ClipIcon className="icon" />}
                disableGrid
            >
                <p>You are not a seller yet.</p>
                <button onClick={handleBecomeSeller} disabled={becomingSeller}>
                    {becomingSeller ? "Becoming a Seller..." : "Become a Seller"}
                </button>
            </DashboardDisplay>
        );
    }

    if (loading) {
        return (
            <DashboardDisplay
                heading="Current Listings"
                intro="Manage your active listings below."
                icon={<ClipIcon className="icon" />}
                disableGrid
            >
                <p>Loading your listings...</p>
            </DashboardDisplay>
        );
    }

    return (
        <div className="listings-page">
            <div className="listings-nav-wrapper"><ListingsNav /></div>

            <DashboardDisplay
                heading="Current Listings"
                intro="Manage your active listings below. You can edit or remove them directly from this view."
                icon={<ClipIcon className="icon" />}
                disableGrid
            >
                <div className="listings-grid">
                    <div className="listing-card create-card" onClick={() => setShowCreateModal(true)}>
                        <AddIcon className="icon" />
                        <p>Create New Listing</p>
                    </div>

                    {activeListings.length === 0 ? (
                        <p className="empty-state">No active listings found.</p>
                    ) : (
                        activeListings.map(listing => (
                            <div key={listing.id} className="listing-card">
                                {listing.imageUrl && <img src={listing.imageUrl} alt={listing.title} className="listing-image" />}
                                <div className="listing-content">
                                <h4>{listing.title}</h4>
                                <p>{listing.description}</p>
                                    <div className="listing-meta">
                                        <div><strong>Category:</strong> {getCategoryName(listing.categoryId)}</div>
                                        <div><strong>Condition:</strong> {getConditionName(listing.conditionId)}</div>
                                        <div><strong>Brand:</strong> {getBrandName(listing.brandId)}</div>
                                        <div><strong>Views:</strong> {listing.views ?? 0}</div>
                                        <div><strong>Price:</strong> {listing.price === 0 ? "Free" : `$${listing.price.toFixed(2)}${listing.isNegotiable ? " - Negotiable" : ""}`}</div>
                                        <div><strong>City:</strong> {listing.city ?? "Not specified"}</div>
                                        <div><strong>Status:</strong> {getStatusName(listing.statusId)}</div>
                                    </div>
                                </div>
                                <div className="listing-actions">
                                    <button onClick={() => setEditingListing(listing)}>
                                        <PencilIcon className="action-icon" /> Edit
                                    </button>
                                    <button onClick={() => handleMarkAsSold(listing)}>
                                        <TrashIcon className="action-icon" /> Mark as Sold
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </DashboardDisplay>

            {showCreateModal && (
                <CreateListing
                    onClose={() => {
                        setShowCreateModal(false);
                        refreshListings();
                    }}
                />
            )}

            {editingListing && (
                <EditListing
                    listing={editingListing}
                    onClose={() => setEditingListing(null)}
                    onUpdate={() => refreshListings()}
                />
            )}
        </div>
    );
}