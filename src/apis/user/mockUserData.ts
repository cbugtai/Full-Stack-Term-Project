import type { User } from "../../types/userSchema"

export const mockUser: User = {
    id: "507f1f77bcf86cd799439011",
    name: "Jane Doe",
    username: "janedoe",
    email: "jane.doe@example.com",
    phone: "+12045551234",
    passwordHash: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf6aYFZ4lF3q9x1Z9Z1eK",
    bio: "Enthusiastic seller of vintage electronics.",
    listings: ["item123", "item456", "item789"],
    profilePic: "/src/assets/default-user.png",
};