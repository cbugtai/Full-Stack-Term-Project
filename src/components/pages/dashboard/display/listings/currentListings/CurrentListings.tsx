import { DashboardDisplay } from "../../DashboardDisplay";
import { ListingsNav } from "../ListingsNav";
import ClipIcon from "@/assets/icons/ClipIcon.svg?react";
import AddIcon from "@/assets/icons/AddIcon.svg?react";
import "../Listings.css";

export function CurrentListings() {
    const listings: any[] = [];

    return (
        <div className="listings-page">
            <div className="listings-nav-wrapper">
                <ListingsNav />
            </div>
            <DashboardDisplay
                heading="Current Listings"
                intro="Manage your active listings below. You can edit or remove them directly from this view."
                icon={<ClipIcon className="icon" />}
            >
                <div className="listings-grid">
                    <div className="listing-card create-card" onClick={() => {}}>
                        <AddIcon className="icon" />
                        <p>Create New Listing</p>
                    </div>

                    {listings.map((listing) => (
                        <div key={listing.id} className="listing-card">
                            <div className="listing-content">
                                <h4>{listing.title}</h4>
                                <p>{listing.description}</p>
                            </div>
                            <div className="listing-actions">
                                <button onClick={() => {}}>Edit</button>
                                <button onClick={() => {}}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardDisplay>
        </div>
    );
}