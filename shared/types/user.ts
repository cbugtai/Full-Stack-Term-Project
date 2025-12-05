export type User = {
    id: string;
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone?: string;
    passwordHash: string;
    bio: string;
    listings: string[];
    profilePic: string | null;
    isSeller?: boolean;
    createdAt?: string;
    updatedAt?: string;
};