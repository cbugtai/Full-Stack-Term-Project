import type { User } from "../../types/userSchema"

export const mockUser: User = {
    id: "507f1f77bcf86cd799439011",
    firstName: "Jane",
    lastName: "Doe",
    username: "janedoe",
    email: "jane.doe@example.com",
    phone: "+12045551234",
    passwordHash: "008c70392e3abfbd0fa47bbc2ed96aa99bd49e159727fcba0f2e6abeb3a9d601",
    bio: "Enthusiastic seller of vintage electronics.",
    listings: ["item123", "item456", "item789"],
    profilePic: "/src/assets/default-user.png",
};