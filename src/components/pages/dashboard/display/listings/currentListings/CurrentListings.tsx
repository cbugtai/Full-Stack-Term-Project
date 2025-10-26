import { useState, useEffect } from "react";
import { CreateListing } from "../createListing/CreateListing";
import { DashboardDisplay } from "../../DashboardDisplay";
import { ListingsNav } from "../ListingsNav";
import { EditListing } from "../editListing/EditListing";
import { useUser } from "@/context/userContext";
import { useListing } from "@/hooks/useListing";
import type { Listing } from "@/types/listing/listingModel";
import ClipIcon from "@/assets/icons/ClipIcon.svg?react";
import AddIcon from "@/assets/icons/AddIcon.svg?react";
import PencilIcon from "@/assets/icons/PencilIcon.svg?react";
import TrashIcon from "@/assets/icons/TrashIcon.svg?react";
import "../Listings.css";

export function CurrentListings() {
    const { user, listings, refreshListings } = useUser();
    const { markListingAsSold } = useListing();
    const [showModal, setShowModal] = useState(false);
    const [editingListing, setEditingListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            refreshListings().finally(() => setLoading(false));
        }
    }, [user]);

    const handleMarkAsSold = async (listingId: string) => {
        try {
            await markListingAsSold(listingId);
        } catch (err) {
            console.error("Failed to mark listing as sold:", err);
        }
    };

    return (
        <div className="listings-page">
            <div className="listings-nav-wrapper">
                <ListingsNav />
            </div>

            <DashboardDisplay
                heading="Current Listings"
                intro="Manage your active listings below. You can edit or remove them directly from this view."
                icon={<ClipIcon className="icon" />}
                disableGrid
            >
                <div className="listings-grid">
                    <div className="listing-card create-card" onClick={() => setShowModal(true)}>
                        <AddIcon className="icon" />
                        <p>Create New Listing</p>
                    </div>

                    {loading ? (
                        <p>Loading listings...</p>
                    ) : listings.filter((l) => l.status === "active").length === 0 ? (
                        <p>No active listings found.</p>
                    ) : (
                        listings
                            .filter((listing) => listing.status === "active")
                            .map((listing) => (
                                <div key={listing.id} className="listing-card">
                                    {listing.imageUrl && (
                                        <img src={listing.imageUrl} alt={listing.title} className="listing-image" />
                                    )}
                                    <div className="listing-content">
                                        <h4>{listing.title}</h4>
                                        <p>{listing.description}</p>

                                        <div className="listing-meta">
                                            <div><strong>Category:</strong> {listing.category || "Uncategorized"}</div>
                                            <div><strong>Condition:</strong> {listing.condition || "Unknown"}</div>
                                            <div><strong>Views:</strong> {listing.views ?? 0}</div>
                                            <div>
                                                <strong>Price:</strong>{" "}
                                                {listing.price === 0
                                                    ? "Free"
                                                    : `$${listing.price.toFixed(2)}${listing.isNegotiable ? " - Negotiable" : ""}`}
                                            </div>
                                            <div><strong>City:</strong> {listing.city || "Not specified"}</div>
                                        </div>

                                    </div>
                                    <div className="listing-actions">
                                        <button onClick={() => setEditingListing(listing)}>
                                            <PencilIcon className="action-icon" />
                                            Edit
                                        </button>
                                        <button onClick={() => handleMarkAsSold(listing.id)}>
                                            <TrashIcon className="action-icon" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </DashboardDisplay>

            {showModal && (
                <CreateListing
                    onClose={() => {
                        setShowModal(false);
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