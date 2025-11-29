import { SignIn } from "@clerk/clerk-react";
import "./SignInPage.css";

export default function SignInPage() {
    return (
        <div className="auth-page">
            <SignIn
                path="/sign-in"
                routing="path"
            />
        </div>
    );
}