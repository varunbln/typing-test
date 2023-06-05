import { SignInButton } from "@clerk/nextjs";

export default function LoginButton() {
    return (
        <SignInButton mode="modal">
            <button className="ml-4 mr-4 font-bold sm:ml-8 sm:mr-8 hover:text-gray-200">
                Login
            </button>
        </SignInButton>
    );
}