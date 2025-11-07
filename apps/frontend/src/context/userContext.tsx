import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/userSchema";
import type { Listing } from "@/types/listing/listingModel";
import { getHydratedUser } from "@/apis/user/userRepo";
import { getListingsByUserId, getHydratedListing } from "@/apis/listing/listingRepo";

type UserContextType = {
    user: User | null;
    setUser: (user: User) => void;
    refreshUser: () => Promise<void>;
    listings: Listing[];
    setListings: (listings: Listing[]) => void;
    refreshListings: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [listings, setListings] = useState<Listing[]>([]);

    const refreshUser = async () => {
        try {
            const hydratedUser = await getHydratedUser();
            if (hydratedUser) {
                setUser(hydratedUser);
            }
        } catch (error) {
            console.error("Failed to refresh user:", error);
        }
    };

    const refreshListings = async () => {
        if (!user?.id) return;
        try {
            const rawListings = await getListingsByUserId(user.id);
            const hydrated = await Promise.all(
                rawListings.map((l) => getHydratedListing(l.id))
            );
            setListings(hydrated.filter((l): l is Listing => l !== null));
        } catch (error) {
            console.error("Failed to refresh listings:", error);
        }
    };

    useEffect(() => {
        refreshUser().then(refreshListings);
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                refreshUser,
                listings,
                setListings,
                refreshListings,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};