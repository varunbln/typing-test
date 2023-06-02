"use client";

import { useCallback, useEffect, useState } from 'react'

const textToType = `hello world how do you do on this fine day
hello world how do you do on this fine day
hello world how do you do on this fine day
hello world how do you do on this fine day
hello world how do you do on this fine day
hello world how do you do on this fine day
hello world how do you do on this fine day  
`;

const isLetter = (str) => {
    if (str === "Space") return " ";
    if (str.length != 4) return false;
    if (str.substring(0, 3) === "Key") return str.substring(3, 4);
    return false;
}

export function TypingArea() {

    let initialText = [];
    for (let i = 0; i < textToType.length; i++) {
        initialText.push({ letter: textToType[i], entered: "false" });
    }

    let [text, setText] = useState(initialText);
    let [currentLetter, setCurrentLetter] = useState(0);

    const resetBox = () => {
        setText([initialText]);
        setCurrentLetter(0);
    }

    const addLetter = (letter) => {
        letter = letter.toLowerCase();
        let correct = textToType[currentLetter] === letter;
        setText(text => text.map((data, index) => {
            if (index !== currentLetter) return data;
            return { letter: data.letter, entered: correct ? "correct" : "wrong" };
        }));
        setCurrentLetter(currentLetter + 1);
        console.log(currentLetter);
    }

    const deleteLetter = () => {
        if (currentLetter === 0) return;
        setText(text => text.map((data, index) => {
            if (index !== currentLetter - 1) return data;
            return { letter: data.letter, entered: "false" };
        }));
        setCurrentLetter(currentLetter - 1);
    }

    const keyDownHandler = useCallback((event) => {
        console.log(event.code);
        if (event.code === "Tab") {
            resetBox();
            return;
        }
        if (event.code === "Backspace") {
            deleteLetter();
            return;
        }
        let letter = isLetter(event.code);
        if (letter === false) return;
        addLetter(letter);
    });

    useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    }, [keyDownHandler]);

    return (
        <div id="typing-area" className="w-full h-full bg-inherit text-3xl">
            {text.map((data, i) => {
                if (i === currentLetter) {
                    return (
                        <span>
                            <span className="h-3 animate-blink border-r-2 border-r-gray-200"></span>
                            <span key={i} className="text-gray-700">{data.letter}</span>
                        </span>
                    )
                }
                return <span key={i} className={(i === currentLetter ? "animate-blink border-l-2" : "") + " " + (data.letter === " " ? "ml-[0.3rem]" : "ml-[0.05rem]") + " box-border " + (data.entered === "false" ? "text-gray-700" : (data.entered === "wrong" ? "text-red-900" : "text-gray-300"))}>{data.letter}</span>
            })}
        </div>
    );
}