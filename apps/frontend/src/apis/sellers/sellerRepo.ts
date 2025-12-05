import type { SellerDto as Seller } from "../../../../../shared/types/seller-terms";

type TermsResponseJSON = {message: String, data: Seller[]};
type TermResponseJSON = {message: String, data: Seller};

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const SELLERS_ENDPOINT = "/sellers"

// THis is a helper fucntion that builds url's with query parameters.
// it needs a url as a string and the query as an object ex. {sellerId : 12}
// retruns a string of the full url with the query ex. "BASE_URL/sellers/favorite?sellerId=12"
function URLWithQuery(
    url: string, 
    query: Record<string, string | number>
): string {
    const usp = new URLSearchParams;

    for ( const [key, value] of Object.entries(query)) {
        usp.set(key, String(value))
    }

    return `${url}?${usp.toString()}`
}

export async function fetchAllSellers(sessionToken?: string | null): Promise<Seller[]> {
    const res: Response = await fetch(
        `${BASE_URL}${SELLERS_ENDPOINT}`,
        sessionToken?{ headers: { Authorization: `Bearer ${sessionToken}` } } : undefined
    )

    if (!res.ok) {
        throw new Error("Failed to fetch Sellers from backend")
    }

    const json: TermsResponseJSON = await res.json()
    return json.data
}

export async function getSellerById(sellerId: number, sessionToken?: string | null): Promise<Seller> {
    const res: Response = await fetch(
        `${BASE_URL}${SELLERS_ENDPOINT}/${sellerId}`,
        sessionToken?{ headers: { Authorization: `Bearer ${sessionToken}` } } : undefined
    )

    if (!res.ok) {
        throw new Error("Failed to fetch Seller from backend")
    }

    const json: TermResponseJSON = await res.json()
    return json.data
}

export async function addFavoriteSeller(sellerId: number, sessionToken?: string | null): Promise<Seller> {
    const queryUrl = URLWithQuery(
        `${BASE_URL}${SELLERS_ENDPOINT}/favorite`,
        { sellerId }
    )

    const res: Response = await fetch(
        queryUrl,
        {
            method: "POST",
            headers: { Authorization: `Bearer ${sessionToken}` }
        }
    )

    if (!res.ok) {
        throw new Error(`Failed to add favorite seller with ID ${sellerId}`)
    }

    const json: TermResponseJSON = await res.json()
    return json.data
}

export async function removeFavoriteSeller(sellerId: number, sessionToken?: string | null): Promise<Seller> {
    const queryUrl = URLWithQuery(
        `${BASE_URL}${SELLERS_ENDPOINT}/favorite`,
        { sellerId }
    )

    const res: Response = await fetch(
        queryUrl,
        {
            method: "DELETE",
            headers: { Authorization: `Bearer ${sessionToken}` }
        }
    )

    if (!res.ok) {
        throw new Error(`Failed to remove favorite seller with ID ${sellerId}`)
    }

    const json: TermResponseJSON = await res.json()
    return json.data
}

export async function addBlockedSeller(sellerId: number, sessionToken?: string | null): Promise<Seller> {
    const queryUrl = URLWithQuery(
        `${BASE_URL}${SELLERS_ENDPOINT}/blocked`,
        { sellerId }
    )

    const res: Response = await fetch(
        queryUrl,
        {
            method: "POST",
            headers: { Authorization: `Bearer ${sessionToken}` }
        }
    )

    if (!res.ok) {
        throw new Error(`Failed to block seller with ID ${sellerId}`)
    }

    const json: TermResponseJSON = await res.json()
    return json.data
}

export async function removeBlockedSeller(sellerId: number, sessionToken?: string | null): Promise<Seller> {
    const queryUrl = URLWithQuery(
        `${BASE_URL}${SELLERS_ENDPOINT}/blocked`,
        { sellerId }
    )

    const res: Response = await fetch(
        queryUrl,
        {
            method: "DELETE",
            headers: { Authorization: `Bearer ${sessionToken}` }
        }
    )

    if (!res.ok) {
        throw new Error(`Failed to unblock seller with ID ${sellerId}`)
    }

    const json: TermResponseJSON = await res.json()
    return json.data
}

export async function createSeller(rating: number = 50, sessionToken?: string | null): Promise<Seller> {
    const res: Response = await fetch(
        `${BASE_URL}${SELLERS_ENDPOINT}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(sessionToken && { Authorization: `Bearer ${sessionToken}` })
            },
            body: JSON.stringify({ rating })
        }
    );

    if (!res.ok) {
        if (res.status === 409) throw new Error("Seller already exists for this user");
        throw new Error("Failed to create Seller");
    }

    const json: TermResponseJSON = await res.json();
    return json.data;
}

export async function getSellerForCurrentUser(sessionToken?: string | null): Promise<Seller | null> {
    const res: Response = await fetch(
        `${BASE_URL}${SELLERS_ENDPOINT}/me`,
        sessionToken ? { headers: { Authorization: `Bearer ${sessionToken}` } } : undefined
    );

    if (res.status === 404) return null;

    if (!res.ok) {
        throw new Error("Failed to fetch seller profile for current user");
    }

    const json: TermResponseJSON = await res.json();
    return json.data;
}