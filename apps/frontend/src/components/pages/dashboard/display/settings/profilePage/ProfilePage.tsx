import { UserProfile, useUser, useAuth } from "@clerk/clerk-react";
import { SettingsNav } from "../SettingsNav";
import { DashboardDisplay } from "../../DashboardDisplay";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
import { useEffect } from "react";
import { saveUser, deleteUser } from "@/apis/user/userRepo";
import "../Settings.css";

export function ProfilePage() {
    const { isSignedIn, user } = useUser();
    const { getToken } = useAuth();

    useEffect(() => {
        if (!user?.id) return;

        const syncUser = async () => {
            try {
                const token = await getToken({ template: "default" });
                if (!token) throw new Error("No session token");

                await saveUser({
                    firstName: user.firstName ?? undefined,
                    lastName: user.lastName ?? undefined,
                    username: user.username ?? undefined,
                    email: user.emailAddresses[0]?.emailAddress ?? undefined,
                    profilePic: user.imageUrl ?? undefined,
                },
                token
                );
            } catch (err) {
                console.error("Failed to sync Clerk user to backend:", err);
            }
        };

        syncUser();
    }, [
        user?.id,
        user?.firstName,
        user?.lastName,
        user?.username,
        user?.imageUrl,
        user?.emailAddresses,
        getToken,
    ]);

    useEffect(() => {
        if (user) return;

        const deleteBackendUser = async () => {
            try {
                const token = await getToken({ template: "default" });
                if (!token) throw new Error("No session token");

                await deleteUser(token);
                console.log("Backend user deleted successfully");
            } catch (err) {
                console.error("Failed to delete backend user:", err);
            }
        };

        deleteBackendUser();
    }, [user, getToken]);

    return (
        <div className="settings-page">
            <div className="settings-nav-wrapper">
                <SettingsNav />
            </div>

            {isSignedIn ? (
                <DashboardDisplay
                    heading="Account Settings"
                    intro="Manage your email, password, username, and profile below."
                    icon={<UserIcon className="icon" />}
                    disableGrid
                >
                    <div className="clerk-profile-wrapper">
                        <UserProfile
                            appearance={{
                                elements: {
                                rootBox: {
                                    width: "100%",
                                    maxWidth: "700px",
                                    zoom: "1",
                                    fontSize: "0.9rem",
                                },
                                },
                            }}
                        />
                    </div>
                </DashboardDisplay>
            ) : (
                <DashboardDisplay
                    heading="Account Settings"
                    intro="You must be signed in to manage your account."
                    icon={<UserIcon className="icon" />}
                    disableGrid
                >
                    <p>Please sign in to manage your email, password, username, and profile.</p>
                </DashboardDisplay>
            )}
        </div>
    );
}