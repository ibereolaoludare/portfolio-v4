"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import GameScene from "@/scenes/game-scene";

export default function PhaserGame({ gameKey }: { gameKey: number }) {
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        if (gameRef.current) {
            gameRef.current.destroy(true);
        }
        gameRef.current = new Phaser.Game({
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: "phaser-container",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { x: 0, y: 300 },
                },
            },
            scene: [GameScene],
            pixelArt: true,
        });

        // Resize handler
        const handleResize = () => {
            if (gameRef.current) {
                gameRef.current.scale.resize(
                    window.innerWidth,
                    window.innerHeight
                );
            }
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            if (gameRef.current) {
                gameRef.current.destroy(true);
            }
        };
    }, [gameKey]);

    return (
        <div
            id="phaser-container"
            style={{ width: "100vw", height: "100vh" }}
        />
    );
}
// For best results, ensure your CSS includes:
// canvas { image-rendering: pixelated; image-rendering: crisp-edges; }
