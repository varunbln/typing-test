import LoginButton from "./LoginButton";
import ProfileButton from "./UserButton";
import { auth } from '@clerk/nextjs';

export function Header() {
    const { userId } = auth();
    return (
        <header className="row-span-1 col-span-3 text-lg flex flex-row justify-between align-middle border-b-2 border-gray-800">
            <button id="home-button" className="ml-6 pl-8 pr-8 text-gray-200 font-semibold">TypingTest</button>
            <div id="login-needed-buttons" className="flex flex-row justify-between">
                <button className="hover:text-gray-200 font-semibold">Stats</button>
                {userId === null ? <LoginButton /> : <ProfileButton />}
            </div>
        </header>
    )
}