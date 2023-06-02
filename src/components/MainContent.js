import { TypingArea } from "./TypingArea";

export function MainContent() {
    return (
        <div className="row-span-1 col-span-6 grid grid-rows-[2fr_4fr_2fr] m-20">
            <div id="settings" className="row-span-1">

            </div>
            <TypingArea />
            <div id="instructions" className="row-span-1">

            </div>
        </div>
    );
}