import { SignInButton } from "@clerk/nextjs";

export default function LoginButton() {
    return (
        <SignInButton mode="modal">
            <button className="sm:ml-8 sm:mr-8 hover:text-gray-200">
                Login
            </button>
        </SignInButton>
    );
}