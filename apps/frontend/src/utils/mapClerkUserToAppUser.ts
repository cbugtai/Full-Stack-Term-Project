import type { User } from "../../../../shared/types/user";
import type { UserResource } from "@clerk/types";

export function mapClerkUserToAppUser(
    clerkUser: UserResource,
    extras?: Partial<User>
): Partial<User> {
    return {
        clerkId: clerkUser.id,
        firstName: clerkUser.firstName ?? "",
        lastName: clerkUser.lastName ?? "",
        username: clerkUser.username ?? "",
        email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
        profilePic: clerkUser.imageUrl ?? "",
        phone: extras?.phone,
        bio: extras?.bio ?? "",
    };
}