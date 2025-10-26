import { useUser } from "@/context/userContext";
import { DashboardDisplay } from "../../DashboardDisplay";
import { ListingsNav } from "../ListingsNav";
import ClockIcon from "@/assets/icons/ClockIcon.svg?react";
import "../Listings.css";

export function ListingHistory() {
    const { listings } = useUser();

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
                    {pastListings.length === 0 ? (
                        <p className="empty-state">You have no past listings.</p>
                    ) : (
                        pastListings.map((listing) => (
                            <div key={listing.id} className="listing-card">
                                {listing.imageUrl && (
                                    <img src={listing.imageUrl} alt={listing.title} className="listing-image" />
                                )}
                                <div className="listing-content">
                                    <h4>{listing.title}</h4>
                                    <p>{listing.description}</p>

                                    <p className="listing-meta">
                                        <strong>Category:</strong> {listing.category || "Uncategorized"}<br />
                                        <strong>Condition:</strong> {listing.condition || "Unknown"}<br />
                                        <strong>Views:</strong> {listing.views ?? 0}<br />
                                        <strong>Status:</strong> Sold
                                    </p>

                                    {listing.updatedAt && (
                                        <span className="timestamp">
                                            Ended on {new Date(listing.updatedAt).toLocaleDateString()}
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