import { useState, useEffect, useCallback } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

import { DashboardDisplay } from "../../DashboardDisplay";
import { ListingsNav } from "../ListingsNav";
import { CreateListing } from "../createListing/CreateListing";

import ClipIcon from "@/assets/icons/ClipIcon.svg?react";
import AddIcon from "@/assets/icons/AddIcon.svg?react";

import { getListingsBySeller } from "@/apis/listing/listingRepo";
import { getStatuses } from "@/apis/meta/metaRepo";
import { getSellerForCurrentUser, createSeller } from "@/apis/sellers/sellerRepo";

import type { ListingWithRelations } from "@/types/listing/listingModel";
import type { SellerDto } from "../../../../../../../../../shared/types/seller-terms";
import type { Status } from "../../../../../../../../../shared/types/metaTypes";

import "../Listings.css";

export function CurrentListings() {
    const { isSignedIn } = useUser();
    const { getToken } = useAuth();

    const [seller, setSeller] = useState<SellerDto | null>(null);
    const [checkingSeller, setCheckingSeller] = useState(true);
    const [becomingSeller, setBecomingSeller] = useState(false);

    const [listings, setListings] = useState<ListingWithRelations[]>([]);
    const [loadingListings, setLoadingListings] = useState(true);

    const [statuses, setStatuses] = useState<Status[]>([]);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const isSeller = !!seller?.id;

    const loadSeller = useCallback(async () => {
        setCheckingSeller(true);
        try {
            const token = await getToken();
            if (!token) return;
            const foundSeller = await getSellerForCurrentUser(token);
            setSeller(foundSeller);
        } catch (err) {
            console.error("Error fetching seller:", err);
            setSeller(null);
        } finally {
            setCheckingSeller(false);
        }
    }, [getToken]);

    const loadListings = useCallback(async () => {
        if (!seller?.id) return;
        setLoadingListings(true);
        try {
            const token = await getToken();
            if (!token) return;
            const sellerListings = await getListingsBySeller(seller.id, token);
            setListings(sellerListings);
        } catch (err) {
            console.error("Error fetching listings:", err);
        } finally {
            setLoadingListings(false);
        }
    }, [seller, getToken]);

    const loadStatuses = useCallback(async () => {
        try {
            const statusList = await getStatuses();
            setStatuses(statusList);
        } catch (err) {
            console.error("Error fetching statuses:", err);
        }
    }, []);

    const handleBecomeSeller = async () => {
        setBecomingSeller(true);
        try {
            const token = await getToken();
            if (!token) return;
            const newSeller = await createSeller(50, token);
            setSeller(newSeller);
        } catch (err) {
            console.error("Failed to become seller:", err);
        } finally {
            setBecomingSeller(false);
        }
    };

    const activeListings = listings.filter(
        l => statuses.find(s => s.id === l.statusId)?.name.toLowerCase() === "active"
    );

    useEffect(() => { loadSeller(); }, [loadSeller]);
    useEffect(() => { loadListings(); }, [loadListings]);
    useEffect(() => { loadStatuses(); }, [loadStatuses]);

    const renderContent = () => {
        if (!isSignedIn) return <p>Please <a href="/sign-in">sign in</a>.</p>;
        if (checkingSeller) return <p>Verifying account...</p>;
        if (!isSeller) return (
            <button onClick={handleBecomeSeller} disabled={becomingSeller}>
                {becomingSeller ? "Creating..." : "Become a Seller"}
            </button>
        );
        if (loadingListings) return <p>Loading your listings...</p>;

        return (
            <>
                <ListingsNav />
                <div className="listings-grid">
                    <div className="listing-card create-card" onClick={() => setShowCreateModal(true)}>
                        <AddIcon className="icon" />
                        <p>Create New</p>
                    </div>

                    {activeListings.length === 0 ? (
                        <p className="empty-state">No active listings</p>
                    ) : (
                        activeListings.map(l => (
                            <div key={l.id} className="listing-card">
                                {l.imageUrl && <img src={l.imageUrl} alt={l.title} className="listing-image" />}

                                <div className="card-content">
                                    <p><strong>Title:</strong> {l.title}</p>
                                    <p><strong>Description:</strong> {l.description}</p>
                                    <p><strong>Category:</strong> {l.category?.category}</p>
                                    <p><strong>Condition:</strong> {l.condition?.condition}</p>
                                    <p><strong>Brand:</strong> {l.brand?.brand}</p>
                                    <p><strong>Price:</strong> ${l.price} {l.isNegotiable ? "(Negotiable)" : "(Fixed Price)"}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {showCreateModal && <CreateListing onClose={() => setShowCreateModal(false)} />}
            </>
        );
    };

    return (
        <DashboardDisplay
            heading={isSeller ? "Current Listings" : "Become a Seller"}
            intro={isSeller ? "Manage your active sale listings." : "You must create a seller account to begin listing."}
            icon={<ClipIcon />}
            disableGrid
        >
            {renderContent()}
        </DashboardDisplay>
    );
}