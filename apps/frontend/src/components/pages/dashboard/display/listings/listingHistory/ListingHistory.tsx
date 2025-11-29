import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { DashboardDisplay } from "../../DashboardDisplay";
import { ListingsNav } from "../ListingsNav";
import ClockIcon from "@/assets/icons/ClockIcon.svg?react";
import { getListingsByUserId } from "@/apis/listing/listingRepo";
import type { Listing } from "@/types/listing/listingModel";
import "../Listings.css";

export function ListingHistory() {
    const { user } = useUser();
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            if (!user?.id) {
                setListings([]);
                setLoading(false);
                return;
            }
            try {
                const userListings = await getListingsByUserId(user.id);
                setListings(userListings);
            } catch (error) {
                console.error("Failed to fetch user listings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [user?.id]);

    const pastListings = listings.filter((listing) => listing.status === "sold");

    return (
        <div className="listings-page">
            <div className="listings-nav-wrapper">
                <ListingsNav />
            </div>
            <DashboardDisplay
                heading="Listing History"
                intro="Review your past listings and activity. These are no longer active but kept for reference."
                icon={<ClockIcon className="icon" />}
                disableGrid
            >
                <div className="listings-grid">
                {loading ? (
                    <p className="empty-state">Loading your listings...</p>
                ) : pastListings.length === 0 ? (
                    <p className="empty-state">You have no past listings.</p>
                ) : (
                    pastListings.map((listing) => (
                        <div key={listing.id} className="listing-card">
                            {listing.imageUrl && (
                            <img
                                src={listing.imageUrl}
                                alt={listing.title}
                                className="listing-image"
                            />
                            )}
                            <div className="listing-content">
                                <h4>{listing.title}</h4>
                                <p>{listing.description}</p>

                                <div className="listing-meta">
                                    <div>
                                        <strong>Category:</strong>{" "}
                                        {listing.category || "Uncategorized"}
                                    </div>
                                    <div>
                                        <strong>Condition:</strong>{" "}
                                        {listing.condition || "Unknown"}
                                    </div>
                                    <div>
                                        <strong>Views:</strong> {listing.views ?? 0}
                                    </div>
                                    <div>
                                        <strong>Status:</strong> Sold
                                    </div>
                                </div>

                                {listing.updatedAt && (
                                    <span className="timestamp">
                                        Ended on{" "}
                                        {new Date(listing.updatedAt).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
                </div>
            </DashboardDisplay>
        </div>
    );
}