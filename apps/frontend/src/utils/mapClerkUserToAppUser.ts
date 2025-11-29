import type { User } from "@/types/userSchema";
import type { UserResource } from "@clerk/types";

export function mapClerkUserToAppUser(clerkUser: UserResource, extras?: Partial<User>): User {
    return {
        id: extras?.id ?? "",
        clerkId: clerkUser.id,
        firstName: clerkUser.firstName ?? "",
        lastName: clerkUser.lastName ?? "",
        username: clerkUser.username ?? "",
        email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
        profilePic: clerkUser.imageUrl ?? "",
        phone: extras?.phone,
        bio: extras?.bio ?? "",
        listings: extras?.listings ?? [],
        passwordHash: extras?.passwordHash ?? "",
        createdAt: extras?.createdAt,
        updatedAt: extras?.updatedAt,
    };
}