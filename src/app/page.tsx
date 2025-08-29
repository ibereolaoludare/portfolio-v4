"use client";
import GameUIContainer from "@/components/game-ui-container";
import PhaserGame from "@/components/phaser-game";
import { useState } from "react";

export default function Home() {
    const [gameKey, setGameKey] = useState(0);

    // Optionally, add a button to manually reset
    return (
        <>
            <GameUIContainer />
            <PhaserGame gameKey={gameKey} />
            <button className="fixed bottom-10 left-10 bg-white uppercase font-mono p-2 border-4 border-orange-900" tabIndex={undefined} onClick={() => setGameKey((k) => k + 1)}>Reset Game</button>
        </>
    );
}
