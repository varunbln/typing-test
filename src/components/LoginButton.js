import { SignInButton } from "@clerk/nextjs";

export default function LoginButton() {
    return (
        <SignInButton mode="modal">
            <button className="ml-8 mr-8 hover:text-gray-200">
                Login
            </button>
        </SignInButton>
    );
}