"use client";

import React, { useEffect } from "react";

export default function Stopwatch() {
    const [second, setSecond] = React.useState<number>(0);
    const [isRunning, setIsRunning] = React.useState<boolean>(false);

    const timeRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleStart = () => {
        if (isRunning) return;

        setIsRunning(true);

        timeRef.current = setInterval(() => {
            setSecond((prev) => prev + 1)
        }, 1000); 
    };

    const handleStop = () => {
        if (!isRunning) return;

        if (timeRef.current) {
            clearInterval(timeRef.current);
            timeRef.current = null;
        }

        setIsRunning(false);
    }

    const handleReset = () => {
        handleStop();
        setSecond(0);
    }

    useEffect(() => {
        return () => {
            if (timeRef.current) {
                clearInterval(timeRef.current);
            }
        };
    }, []);

    const formatTime = (totalSecond: number) => {
        const mins = Math.floor(totalSecond / 60);
        const secs = totalSecond % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-neutral-900 text-white rounded-2xl shadow-xl w-72 space-y-4">
            <h2 className="text-xl font-bold tarcking-wide">Stopwatch</h2>

            <div className="text-5xl font-mono font-extrabold tracking-wide">
                {formatTime(second)}
            </div>

            <div className="flex gap-2 w-full pt-2"> 
                {!isRunning ? (
                    <button
                        onClick={handleStart} 
                        className="flex-1 bg-green-600 hover:bg-green-500 active:bg-green-700 py-2 rounded-lg font-medium transition"
                    >
                        Mulai
                    </button>
                ) : (
                    <button
                        onClick={handleStop}
                        className="flex-1 bg-red-600 hover:bg-red-500 active:bg-red-700 py-2 rounded-lg font-medium transition"
                    >
                        Jeda
                    </button>
                )}

                <button
                    onClick={handleReset}
                    className="flex-1 bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-800 py-2 rounded-lg font-medium transition"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}