"use client";
import PhaserGame from "@/components/phaser-game";
import { useState } from "react";

export default function Home() {
    const [gameKey, setGameKey] = useState(0);

    // Optionally, add a button to manually reset
    return (
        <>
            <PhaserGame gameKey={gameKey} />
            <button className="fixed top-10 right-10" onClick={() => setGameKey((k) => k + 1)}>Reset Game</button>
        </>
    );
}
