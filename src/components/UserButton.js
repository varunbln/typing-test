import { UserButton } from "@clerk/nextjs";

export default function ProfileButton() {
    return (
        <div className="ml-8 mr-8 flex flex-col justify-center">
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}