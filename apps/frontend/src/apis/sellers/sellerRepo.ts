import type { SellerDto as Seller, SellersPageDto } from "../../../../../shared/types/seller-terms";

type SellersResponseJSON = {
    message: String
    data: SellersPageDto
    status: "success"
};
type SellerResponseJSON = {message: String, data: Seller};
type ErrResponseJSON = { message: string; code: string; status: "error" };

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const SELLERS_ENDPOINT = "/sellers"

// THis is a helper fucntion that builds url's with query parameters.
// it needs a url as a string and the query as an object ex. {sellerId : 12}
// retruns a string of the full url with the query ex. "BASE_URL/sellers/favorite?sellerId=12"
function URLWithQuery(
    url: string, 
    query: Record<string | number, string | number>
): string {
    const usp = new URLSearchParams;

    for ( const [key, value] of Object.entries(query)) {
        usp.set(key, String(value))
    }

    return `${url}?${usp.toString()}`
}

export async function fetchAllSellers(
    page?: number,
    pageSize?: number,
    sessionToken?: string | null
): Promise<SellersPageDto> {
    const baseUrl = `${BASE_URL}${SELLERS_ENDPOINT}`

    const url = 
        page !== undefined && pageSize !==undefined
        ? URLWithQuery(baseUrl, {page, pageSize})
        : baseUrl;

    const res: Response = await fetch(url, {
        ...(sessionToken
        ? { headers: { Authorization: `Bearer ${sessionToken}` } } 
        : {})
    })

    if (!res.ok) {
        throw new Error("Failed to fetch Sellers from backend")
    }

    // if the server is unreachable, the json parsing will fail
    let json: SellersResponseJSON | ErrResponseJSON;
    try {
        json = await res.json();
    } catch (e) {
        throw new Error(`SERVER_UNREACHABLE, ${e}`);
    }

    // if the response indicates there is an error, throw an error
    if (json.status === "error") {
        const error = new Error(`${json.message}`) as Error & { code: string };
        error.code = json.code;
        throw error;
    }

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

    const json: SellerResponseJSON = await res.json()
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

    const json: SellerResponseJSON = await res.json()
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

    const json: SellerResponseJSON = await res.json()
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

    const json: SellerResponseJSON = await res.json()
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

    const json: SellerResponseJSON = await res.json()
    return json.data
}