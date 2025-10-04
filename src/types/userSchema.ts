export type User = {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    bio: string;
    role: "buyer" | "seller" | "admin";
    listings: string[];
    profilePic: string;
};