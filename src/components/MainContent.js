"use client";

import { TypingArea } from "./TypingArea";
import { useCallback, useEffect, useState } from "react";
import { wordsList } from '../utils/wordsList.js'

const getRandomWords = () => {
    let words = wordsList.split(" ");
    let randomWords = [];
    for (let i = 0; i < 100; i++) {
        randomWords.push(words[Math.floor(Math.random() * words.length)]);
    }
    randomWords = randomWords.join(" ");
    return randomWords.replace("  ", " ");
}

export function MainContent() {

    const totalTime = 30;

    const [done, setDone] = useState(false);
    const [timer, setTimer] = useState(0);
    const [words, setWords] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!done) {
                setTimer(prevTimer => {
                    if (prevTimer === totalTime) {
                        setDone(true);
                        return 0;
                    }
                    return prevTimer + 1;
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [done]);

    const keyDownHandler = useCallback((event) => {
        if (event.code === "Tab") {
            setTimer(0);
            setDone(!done);
            setWords(0);
            setTextToType(getRandomWords());
            setText(textToType.split("").map((letter) => ({ letter: letter, entered: "false" })));
            event.preventDefault();
            return;
        }
    });

    useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    }, [keyDownHandler]);

    const calculateRemainingTime = (currentTime) => {
        return (totalTime - currentTime);
    }

    const [textToType, setTextToType] = useState("");

    useEffect(() => {
        const randomWords = getRandomWords();
        setTextToType(randomWords);
    }, []);

    let [text, setText] = useState([]);

    useEffect(() => {
        setText(textToType.split("").map((letter) => ({ letter: letter, entered: "false" })));
    }, [textToType]);


    const calculateWPM = () => {
        let words = 0;
        let correct = true;
        for (let letter in text) {
            if (text[letter].entered === "wrong") {
                correct = false;
                continue;
            }
            if (text[letter].entered === "false") {
                correct = false;
                continue;
            }
            if (text[letter].letter === " ") {
                if (correct) words++;
                correct = true;
                continue;
            }
        }
        return ((words * 60) / totalTime);
    }

    const calculateRawWPM = () => {
        let words = 0;
        let correct = true;
        for (let letter in text) {
            if (text[letter].entered === "false") {
                correct = false;
                continue;
            }
            if (text[letter].letter === " ") {
                if (correct) words++;
                correct = true;
                continue;
            }
        }
        return ((words * 60) / totalTime);
    }

    return (
        <div className="row-span-1 col-span-6 grid grid-rows-[1fr_3fr_1fr] mt-10 mr-20 ml-20">
            <div id="settings" className="row-span-1">

            </div>
            {done ?
                <div id="stats-display">
                    <div id="wpm-display" className="font-black text-8xl text-center text-gray-100 ">WPM: {calculateWPM()}</div>
                    <div className="font-semibold text-2xl text-center mt-5 mb-8 text-gray-400">Raw WPM: {calculateRawWPM()}</div>
                    <p className="text-center">WPM indicates the number of correct words typed per minute.</p>
                    <p className="text-center"> Raw WPM indicates the total number of words typed per minute, correct or not.</p>
                </div> :
                <div id="main-container">
                    <div id="timer">
                        <p className="text-xl pl-20 text-gray-400 font-bold">Remaining Time: {calculateRemainingTime(timer)}</p>
                    </div>
                    <TypingArea setTimer={setTimer} setWords={setWords} text={text} setText={setText} textToType={textToType} setTextToType={setTextToType} getRandomWords={getRandomWords} />
                </div>
            }
            <div id="instructions" className="row-span-1">
                <p className="text-center">Press <span className="text-gray-200">TAB</span> to restart test.</p>
                <p className="text-center mt-5">By Varun Prahlad Balani:
                    <a className="text-gray-200 pl-2" href="https://github.com/varun-balani"> Github</a>
                    <a className="text-gray-200 pl-3" href="https://www.linkedin.com/in/varun-prahlad-balani-961438200/">LinkedIn</a>
                </p>
            </div>
        </div>
    );
}