import { useState, useEffect, useCallback } from "react";
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
import { getSellerForCurrentUser, createSeller } from "@/apis/sellers/sellerRepo";

import type { Listing } from "@/types/listing/listingModel";
import type { SellerDto } from "../../../../../../../../../shared/types/seller-terms";
import type { Status } from "../../../../../../../../../shared/types/metaTypes";

import "../Listings.css";

export function CurrentListings() {
    const { isSignedIn } = useUser();
    const { getToken } = useAuth();

    const [seller, setSeller] = useState<SellerDto | null>(null);
    const [checkingSeller, setCheckingSeller] = useState(true);
    const [becomingSeller, setBecomingSeller] = useState(false);

    const [listings, setListings] = useState<Listing[]>([]);
    const [loadingListings, setLoadingListings] = useState(true);

    const [statuses, setStatuses] = useState<Status[]>([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingListing, setEditingListing] = useState<Listing | null>(null);

    const isSeller = !!seller?.id;

    const loadSeller = useCallback(async () => {
        console.log("[CurrentListings] loadSeller: start");
        try {
            const token = await getToken();
            console.log("[CurrentListings] Token:", token);

            if (!token) {
                console.warn("[CurrentListings] No token, aborting seller fetch");
                return;
            }

            const found = await getSellerForCurrentUser(token);
            console.log("[CurrentListings] Seller fetched from /me:", found);

            setSeller(found);
        } catch (err) {
            console.error("[CurrentListings] Error fetching seller:", err);
            setSeller(null);
        } finally {
            console.log("[CurrentListings] loadSeller: finished");
            setCheckingSeller(false);
        }
    }, [getToken]);

    useEffect(() => {
        console.log("[CurrentListings] useEffect -> loadSeller");
        loadSeller();
    }, [loadSeller]);

    const loadListings = useCallback(async () => {
        if (!seller?.id) {
            console.log("[CurrentListings] loadListings: No seller ID, skipping");
            return;
        }

        console.log("[CurrentListings] loadListings: sellerId =", seller.id);
        setLoadingListings(true);

        try {
            const sellerListings = await getListingsBySeller(seller.id);
            console.log("[CurrentListings] Listings fetched:", sellerListings.length);
            setListings(sellerListings);
        } catch (err) {
            console.error("[CurrentListings] Error fetching listings:", err);
        } finally {
            console.log("[CurrentListings] loadListings: finished");
            setLoadingListings(false);
        }
    }, [seller]);

    useEffect(() => {
        console.log("[CurrentListings] useEffect -> loadListings");
        loadListings();
    }, [loadListings]);

    useEffect(() => {
        const loadStatuses = async () => {
            console.log("[CurrentListings] loadStatuses: start");
            try {
                const [, , , statusList] = await Promise.all([
                getCategories(),
                getConditions(),
                getBrands(),
                getStatuses(),
                ]);
                console.log("[CurrentListings] Statuses fetched:", statusList.map(s => s.name));
                setStatuses(statusList);
            } catch (err) {
                console.error("[CurrentListings] Error fetching statuses:", err);
            } finally {
                console.log("[CurrentListings] loadStatuses: finished");
            }
        };
        loadStatuses();
    }, []);

    const handleBecomeSeller = async () => {
        console.log("[CurrentListings] handleBecomeSeller: start");
        setBecomingSeller(true);

        try {
            const token = await getToken();
            console.log("[CurrentListings] Token for creating seller:", token);

            if (!token) return;

            const newSeller = await createSeller(50, token);
            console.log("[CurrentListings] New seller created:", newSeller);

            setSeller(newSeller);
        } catch (err) {
            console.error("[CurrentListings] Failed to become a seller:", err);
        } finally {
            console.log("[CurrentListings] handleBecomeSeller: finished");
            setBecomingSeller(false);
        }
    };

    const handleMarkAsSold = async (listing: Listing) => {
        console.log("[CurrentListings] handleMarkAsSold: listingId =", listing.id);
        const soldStatus = statuses.find(s => s.name.toLowerCase() === "sold");

        if (!soldStatus) {
            console.warn("[CurrentListings] No SOLD status configured");
            return alert("No SOLD status configured.");
        }

        try {
            await updateListing(listing.id, { statusId: soldStatus.id });
            console.log("[CurrentListings] Listing updated, refreshing...");
            await loadListings();
        } catch (err) {
            console.error("[CurrentListings] Error marking listing as sold:", err);
        }
    };

    const activeListings = listings.filter(
        l => statuses.find(s => s.id === l.statusId)?.name.toLowerCase() === "active"
    );

    const renderContent = () => {
        console.log("[CurrentListings] renderContent: start");

        if (!isSignedIn) {
            console.log("[CurrentListings] User not signed in");
            return (
                <p>Please <a href="/sign-in">sign in</a>.</p>
            );
        }

        if (checkingSeller) {
            console.log("[CurrentListings] Checking seller...");
            return <p>Verifying account...</p>;
        }

        if (!isSeller) {
            console.log("[CurrentListings] User is not a seller");
            return (
                <button onClick={handleBecomeSeller} disabled={becomingSeller}>
                    {becomingSeller ? "Creating..." : "Become a Seller"}
                </button>
            );
        }

        if (loadingListings) {
            console.log("[CurrentListings] Loading listings...");
            return <p>Loading your listings...</p>;
        }

        console.log("[CurrentListings] Rendering active listings:", activeListings.length);

        return (
            <>
                <ListingsNav />
                <div className="listings-grid">
                    <div className="listing-card create-card" onClick={() => setShowCreateModal(true)}>
                        <AddIcon className="icon" />
                        <p>Create New</p>
                    </div>
                    {activeListings.length === 0 ? (
                        <p>No active listings</p>
                    ) : (
                        activeListings.map(l => (
                        <div key={l.id} className="listing-card">
                            {l.imageUrl && <img src={l.imageUrl} alt={l.title} />}
                            <h4>{l.title}</h4>
                            <p>{l.description}</p>
                            <button onClick={() => setEditingListing(l)}><PencilIcon /> Edit</button>
                            <button onClick={() => handleMarkAsSold(l)}><TrashIcon /> Sold</button>
                        </div>
                        ))
                    )}
                </div>

                {showCreateModal && <CreateListing onClose={() => setShowCreateModal(false)} />}
                {editingListing && (
                    <EditListing
                        listing={editingListing}
                        onClose={() => setEditingListing(null)}
                        onUpdate={loadListings}
                    />
                )}
            </>
        );
    };

    console.log("[CurrentListings] render: start, isSeller =", isSeller);

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