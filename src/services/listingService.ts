import { updateListing } from "@/apis/listing/listingRepo";

export const listingService = {
    async markAsSold(id: string) {
        return updateListing(id, { status: "sold" });
    }
};
