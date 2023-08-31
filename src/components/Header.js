import LoginButton from "./LoginButton";
import ProfileButton from "./UserButton";
import { auth } from '@clerk/nextjs';

export function Header() {
    const { userId } = auth();
    return (
        <header className="pt-3 pb-3 sm:pt-0 sm:pb-0 row-span-1 col-span-3 text-lg flex flex-row justify-between align-middle border-b-2 border-gray-800">
            <button id="home-button" className="ml-4 sm:ml-6 sm:pl-8 sm:pr-8 text-gray-200 font-semibold">TypingTest</button>
            <div id="login-needed-buttons" className="flex flex-row justify-between">
                {userId === null ? <LoginButton /> : <ProfileButton />}
            </div>
        </header>
    )
}