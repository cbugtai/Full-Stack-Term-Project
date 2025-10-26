import { DashboardDisplay } from "../../DashboardDisplay";
import { ListingsNav } from "../ListingsNav";
import ClockIcon from "@/assets/icons/ClockIcon.svg?react";
import "../Listings.css";

export function ListingHistory() {
    const pastListings: any[] = [];

    return (
        <div className="listings-page">
            <ListingsNav />
            <DashboardDisplay
                heading="Listing History"
                intro="Review your past listings and activity. These are no longer active but kept for reference."
                icon={<ClockIcon className="icon" />}
            >
                <div className="listings-grid">
                    {pastListings.length === 0 ? (
                        <p className="empty-state">You have no past listings.</p>
                    ) : (
                        pastListings.map((listing) => (
                            <div key={listing.id} className="listing-card">
                                <div className="listing-content">
                                    <h4>{listing.title}</h4>
                                    <p>{listing.description}</p>
                                    <span className="timestamp">Ended on {listing.endDate}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </DashboardDisplay>
        </div>
    );
}