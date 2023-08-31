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

    const resetBox = () => {
        setTimer(0);
        setDone(!done);
        setTextToType(getRandomWords());
        setText(textToType.split("").map((letter) => ({ letter: letter, entered: "false" })));
    }

    const keyDownHandler = useCallback((event) => {
        if (event.code === "Tab") {
            resetBox();
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
        return Math.ceil((words * 60) / totalTime);
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
        return Math.ceil((words * 60) / totalTime);
    }

    const calculateAccuracy = () => {
        let correct = 0;
        let wrong = 0;
        for (let letter in text) {
            if (text[letter].entered === "wrong") wrong++;
            if (text[letter].entered === "correct") correct++;
        }
        let accuracy = ((correct / (correct + wrong)) * 100).toFixed(2);
        if (accuracy == NaN) return 0;
        return accuracy;
    }

    return (
        <div className="row-span-1 col-span-6 grid grid-rows-[0.1fr_3fr_1fr] sm:grid-rows-[0.5fr_4fr_1fr] mt-2 mr-4 ml-4 sm:mt-10 sm:mr-20 sm:ml-20">
            <div id="settings" className="row-span-1">

            </div>
            {done ?
                <div id="stats-display">
                    <div id="wpm-display" className="mt-20 font-black text-6xl sm:text-8xl text-center text-gray-100 ">WPM: {calculateWPM()}</div>
                    <div className="font-semibold text-xl sm:text-2xl text-center mt-5 mb-8 text-gray-400">Raw WPM: {calculateRawWPM()}, Accuracy: {calculateAccuracy() === "NaN" ? 0 : calculateAccuracy()}%</div>
                    <p className="text-center pb-4 sm:pb-0">WPM indicates the number of correct words typed per minute.</p>
                    <p className="text-center pb-4 sm:pb-0"> Raw WPM indicates the total number of words typed per minute, correct or not.</p>
                    <p className="text-center"> Accuracy is the percentage of characters correctly entered.</p>
                </div> :
                <div id="main-container">
                    <div id="timer">
                        <p className="text-base sm:text-xl text-left mb-6 sm:mb-0 sm:pl-20 text-gray-400 font-bold">Remaining Time: {calculateRemainingTime(timer)}</p>
                    </div>
                    <div id="main-box-container">
                        <input id="fake-input-box" type="text" className="caret-transparent text-gray-900 bg-gray-900 hover:border-0 hover:bg-gray-900 focus:outline-none focus:border-0" autoFocus></input>
                        <TypingArea setTimer={setTimer} text={text} setText={setText} textToType={textToType} setTextToType={setTextToType} getRandomWords={getRandomWords} />
                    </div>
                </div>
            }
            <div id="instructions" className="row-span-1 flex flex-col mt-6 sm:mt-0 sm:block">
                <button className="p-3 bg-gray-800 sm:hidden" onClick={resetBox}>Restart Test</button>
                <p className="text-center hidden sm:block">Press <span className="text-gray-200">TAB</span> to restart test.</p>
                <p className="text-center mt-12 sm:mt-5">By Varun Prahlad Balani:
                    <a className="text-gray-200 pl-2" href="https://github.com/varun-balani"> Github</a>
                    <a className="text-gray-200 pl-3" href="https://www.linkedin.com/in/varun-prahlad-balani-961438200/">LinkedIn</a>
                </p>
            </div>
        </div>
    );
}