import { listingService } from "../services/listingService";
import { useUser } from "../context/userContext";

export function useListing() {
    const { refreshListings } = useUser();

    const markListingAsSold = async (id: string) => {
        await listingService.markAsSold(id);
        await refreshListings();
    };

    return { markListingAsSold };
}