import { UserButton } from "@clerk/nextjs";

export default function ProfileButton() {
    return (
        <div className="ml-4 mr-4 sm:ml-8 sm:mr-8 flex flex-col justify-center">
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}