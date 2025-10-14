import "./DashboardDisplay.css";
import { DefaultDisplay } from "./defaultDisplay/DefaultDisplay";
import { ChangeUsername } from "./settings/changeUsername/ChangeUsername";
import { ChangePassword } from "./settings/changePassword/ChangePassword";
import { ChangeProfilePicture } from "./settings/changeProfilePicture/ChangeProfilePic";
import { EditBio } from "./settings/editBio/EditBio";
import { ManageContact } from "./settings/manageContact/ManageContact";
import { DeleteAccount } from "./settings/deleteAccount/DeleteAccount";

export const DASHBOARD_OPTIONS = {
    DEFAULT: 'DEFAULT',
    CHANGE_USERNAME: 'CHANGE_USERNAME',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    CHANGE_PROFILE_PICTURE: 'CHANGE_PROFILE_PICTURE',
    EDIT_BIO: 'EDIT_BIO',
    MANAGE_CONTACT: 'MANAGE_CONTACT',
    DELETE_ACCOUNT: 'DELETE_ACCOUNT',
} as const;

export function RenderDisplay({ selectedOption }: { selectedOption: keyof typeof DASHBOARD_OPTIONS | null }) {
    switch (selectedOption) {
        default:
            return <DefaultDisplay />;
        case DASHBOARD_OPTIONS.CHANGE_USERNAME:
            return <ChangeUsername />;
        case DASHBOARD_OPTIONS.CHANGE_PASSWORD:
            return <ChangePassword />;
        case DASHBOARD_OPTIONS.CHANGE_PROFILE_PICTURE:
            return <ChangeProfilePicture />;
        case DASHBOARD_OPTIONS.EDIT_BIO:
            return <EditBio />;
        case DASHBOARD_OPTIONS.MANAGE_CONTACT:
            return <ManageContact />;
        case DASHBOARD_OPTIONS.DELETE_ACCOUNT:
            return <DeleteAccount />;
    }
}