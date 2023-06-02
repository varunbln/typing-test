import { TypingArea } from "./TypingArea";

export function MainContent() {
    return (
        <div className="row-span-1 col-span-6 grid grid-rows-[1fr_6fr_1fr] m-20">
            <div id="settings" className="row-span-1">

            </div>
            <TypingArea />
            <div id="instructions" className="row-span-1">

            </div>
        </div>
    );
}