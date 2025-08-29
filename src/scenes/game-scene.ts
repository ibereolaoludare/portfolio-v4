"use client";

import * as Phaser from "phaser";

class GameScene extends Phaser.Scene {
    // Player properties
    player!: Phaser.GameObjects.TileSprite;
    bee!: Phaser.GameObjects.Sprite;
    playerTileX: number = 16;
    playerTileY: number = 16;
    playerScale: number = 5;

    // Input keys
    wKey!: Phaser.Input.Keyboard.Key;
    aKey!: Phaser.Input.Keyboard.Key;
    sKey!: Phaser.Input.Keyboard.Key;
    dKey!: Phaser.Input.Keyboard.Key;
    shiftKey!: Phaser.Input.Keyboard.Key;
    spaceKey!: Phaser.Input.Keyboard.Key;

    // Physics and movement
    playerVelocityY: number = 0;
    gravity: number = 10; // Adjust as needed
    jumpStrength: number = -12.5; // Negative for upward jump
    isOnGround: boolean = false;

    // Animation and timing
    lastMoveTime: number = 0;
    moveInterval: number = 1000 / 8;
    defaultPlayerTileX: number = 0;
    defaultPlayerTileY: number = 0;
    idleFrameInterval: number = 1000 / 8; // ms per idle frame
    lastIdleFrameTime: number = 0;

    // Bee timing
    lastBeeUpdateTime: number = 0;
    beeUpdateInterval: number = 1000 / 8;
    beeIdleTime: number = 0;
    beeLoopOriginX: number = 0;
    beeLoopOriginY: number = 0;

    // Add these properties to your class:
    lastPointerX: number = 0;
    lastPointerY: number = 0;
    clouds: Phaser.GameObjects.Sprite[] = [];

    constructor() {
        super("scene-game");
    }

    preload() {
        this.load.image("me", "/assets/me.png");
        this.load.image("grass", "/assets/grass.png");
        this.load.image("rock", "/assets/rock.png");
        this.load.image("rock-2", "/assets/rock-2.png");
        this.load.image("sun", "/assets/sun.png");
        this.load.image("sunflower", "/assets/sunflower.png");
        this.load.image("tree", "/assets/tree.png");
        this.load.image("dirt", "/assets/dirt.png");
        this.load.image("bush", "/assets/bush.png");
        this.load.image("bush-2", "/assets/bush-2.png");
        this.load.image("bee", "/assets/bee.png");
        this.load.image("cloud", "/assets/cloud.png");
        this.load.image("cloud-2", "/assets/cloud-2.png");
        this.load.image("background", "/assets/background.png");
    }

    create() {
        // Set up input keys
        if (this.input.keyboard) {
            this.wKey = this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.W
            );
            this.aKey = this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.A
            );
            this.sKey = this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.S
            );
            this.dKey = this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.D
            );
            this.shiftKey = this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SHIFT
            );
            this.spaceKey = this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            );
        }

        // Background
        this.add
            .tileSprite(
                0,
                0,
                this.scale.width,
                (this.scale.height * 2) / 3,
                "background"
            )
            .setOrigin(0, 0)
            .setScale(1);

        this.add
            .tileSprite(
                0,
                (this.scale.height * 2) / 3,
                this.scale.width,
                16,
                "grass"
            )
            .setOrigin(0, 0)
            .setScale(5);

        this.add
            .tileSprite(
                0,
                (this.scale.height * 2) / 3 + 5 * 16,
                this.scale.width,
                this.scale.height,
                "dirt"
            )
            .setOrigin(0, 0)
            .setScale(5);

        // tree

        this.add
            .sprite(
                this.scale.width / 12,
                (this.scale.height * 2) / 3 - 64 * 5,
                "tree"
            )
            .setScale(5)
            .setOrigin(0, 0);
        // this.add
        //     .tileSprite(
        //         this.scale.width / 12,
        //         (this.scale.height * 2) / 3 - 64 * 5,
        //         64,
        //         64,
        //         "tree"
        //     )
        //     .setOrigin(0, 0)
        //     .setScale(5);

        //bushes
        this.add
            .sprite(
                this.scale.width / 8,
                (this.scale.height * 2) / 3 - 16 * 5,
                "bush"
            )
            .setOrigin(0, 0)
            .setScale(5);
        this.add
            .sprite(
                this.scale.width / 7,
                (this.scale.height * 2) / 3 - 16 * 5,
                "bush"
            )
            .setOrigin(0, 0)
            .setScale(5);
        this.add
            .sprite(
                this.scale.width / 6,
                (this.scale.height * 2) / 3 - 16 * 5,
                "bush-2"
            )
            .setOrigin(0, 0)
            .setScale(5);
        this.add
            .sprite(
                this.scale.width / 5,
                (this.scale.height * 2) / 3 - 16 * 5,
                "bush-2"
            )
            .setOrigin(0, 0)
            .setScale(5);
        this.add
            .sprite(
                this.scale.width / 4.5,
                (this.scale.height * 2) / 3 - 16 * 5,
                "bush-2"
            )
            .setOrigin(0, 0)
            .setScale(5);
        this.add
            .sprite(
                this.scale.width / 4,
                (this.scale.height * 2) / 3 - 16 * 5,
                "bush"
            )
            .setOrigin(0, 0)
            .setScale(5);

        this.add
            .sprite(
                this.scale.width / 1.2,
                (this.scale.height * 2) / 3 - 16 * 5,
                "bush"
            )
            .setOrigin(0, 0)
            .setScale(5);
        this.add
            .sprite(
                this.scale.width / 1.25,
                (this.scale.height * 2) / 3 - 16 * 5,
                "bush-2"
            )
            .setOrigin(0, 0)
            .setScale(5);

        this.add
            .sprite(
                this.scale.width / 1.35,
                (this.scale.height * 2) / 3 - 16 * 5,
                "sunflower"
            )
            .setOrigin(0, 0)
            .setScale(5);

        this.add
            .sprite(
                this.scale.width / 1.2,
                this.scale.height / 2 + 14 * 5,
                "rock-2"
            )
            .setOrigin(0, 0)
            .setScale(5);

        this.add
            .sprite(
                this.scale.width / 9,
                this.scale.height / 2 + 14 * 5,
                "rock-2"
            )
            .setOrigin(0, 0)
            .setScale(5);

        this.add
            .sprite(
                this.scale.width / 2.5,
                this.scale.height / 2 + 14 * 5,
                "rock"
            )
            .setOrigin(0, 0)
            .setScale(5);

        this.add
            .sprite(this.scale.width / 1.08, this.scale.height / 7, "sun")
            .setOrigin(0.5, 0.5)
            .setScale(5);

        const cloud1 = this.add
            .sprite(this.scale.width / 1.5, this.scale.height / 9, "cloud")
            .setOrigin(0.5, 0.5)
            .setScale(2.5)
            .setAlpha(0.8);

        const cloud2 = this.add
            .sprite(this.scale.width / 9, this.scale.height / 6, "cloud-2")
            .setOrigin(0.5, 0.5)
            .setScale(2.5)
            .setAlpha(0.5);

        this.clouds = [cloud1, cloud2];

        // bee
        this.bee = this.add
            .sprite(this.scale.width / 1.275, this.scale.height / 1.7, "bee")
            .setOrigin(0.5, 1)
            .setScale(4)
            .setRotation(1);

        this.beeLoopOriginX = this.bee.x;
        this.beeLoopOriginY = this.bee.y;

        // Player setup
        this.player = this.add
            .tileSprite(
                this.scale.width / 2,
                this.scale.height / 2,
                16,
                32,
                "me"
            )
            .setScale(this.playerScale);
        this.playerTileX = this.defaultPlayerTileX;
        this.playerTileY = this.defaultPlayerTileY;
        this.player.tilePositionX = this.playerTileX;
        this.player.tilePositionY = this.playerTileY;
    }

    update(time: number) {
        // --- Horizontal Movement ---
        const speed = !this.shiftKey.isDown ? { x: 6, y: 0 } : { x: 16, y: 0 };
        let moved = false;
        const fullTileX = 16;
        const movementKeyDown = this.aKey.isDown || this.dKey.isDown;
        const fullTileY = 32;
        // this.defaultPlayerTileX =
        //     movementKeyDown && this.shiftKey.isDown ? 6 + 24 * 5 : 6;

        if (time > this.lastMoveTime + this.moveInterval) {
            if (movementKeyDown) {
                this.playerTileY = fullTileY;
                if (this.shiftKey.isDown) {
                    if (this.playerTileX > fullTileX * 4) {
                        this.playerTileX = 0;
                    }
                    this.playerTileX += fullTileX;
                } else {
                    if (this.playerTileX > fullTileX * 4) {
                        this.playerTileX = this.defaultPlayerTileX;
                    }
                    this.playerTileX += fullTileX;
                }
                moved = true;
            }
        }

        if (this.aKey.isDown) {
            this.player.x -= speed.x;
            this.player.flipX = true;
        }
        if (this.dKey.isDown) {
            this.player.x += speed.x;
            this.player.flipX = false;
        }

        // --- Animation Frame Update ---
        if (moved) {
            this.player.tilePositionX = this.playerTileX;
            this.player.tilePositionY = this.playerTileY;
            this.lastMoveTime = time;
        } else if (
            !movementKeyDown &&
            time > this.lastIdleFrameTime + this.idleFrameInterval
        ) {
            // Cycle through idle frames
            this.playerTileX += fullTileX;
            if (this.playerTileX > fullTileX * 4) {
                this.playerTileX = this.defaultPlayerTileX;
            }
            this.player.tilePositionX = this.playerTileX;
            this.player.tilePositionY = this.defaultPlayerTileY;
            this.lastIdleFrameTime = time;
        }

        // --- Gravity and Jumping ---
        this.playerVelocityY += (this.gravity * 1) / 20;
        this.player.y += this.playerVelocityY;

        // Ground collision (adjust groundY as needed)
        const groundY = (this.scale.height * 2) / 3.35;
        if (this.player.y >= groundY) {
            this.player.y = groundY;
            this.playerVelocityY = 0;
            this.isOnGround = true;
        } else {
            this.isOnGround = false;
        }

        // Jumping
        if (this.spaceKey.isDown && this.isOnGround) {
            this.playerVelocityY = this.jumpStrength;
            this.isOnGround = false;
        }

        // --- Clamp Player Position ---
        const halfWidth = this.player.displayWidth / 2;
        this.player.x = Phaser.Math.Clamp(
            this.player.x,
            halfWidth,
            this.scale.width - halfWidth
        );

        // BEE stuff
        if (time > this.lastBeeUpdateTime + this.beeUpdateInterval) {
            const pointer = this.input.activePointer;
            const beeCenterX = this.bee.x;
            const beeBottomY = this.bee.y;

            // Calculate pointer velocity
            const pointerVx = pointer.worldX - this.lastPointerX;
            const pointerVy = pointer.worldY - this.lastPointerY;
            const pointerSpeed = Math.sqrt(
                pointerVx * pointerVx + pointerVy * pointerVy
            );

            // Update last pointer position
            this.lastPointerX = pointer.worldX;
            this.lastPointerY = pointer.worldY;

            const dx = pointer.worldX - beeCenterX;
            const dy = pointer.worldY - beeBottomY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const mouseMoving = pointerSpeed > 1.5; // Threshold for "moving"
            const closeEnough = 110; // pixels

            this.beeIdleTime += this.beeUpdateInterval;

            if (!mouseMoving || distance < closeEnough) {
                if (distance < closeEnough && !mouseMoving) {
                    // --- Infinity Loop Animation Around Cursor ---
                    const t = this.beeIdleTime / 1000;
                    const a = 100; // Wider loop

                    // Infinity loop is always relative to pointer
                    const x =
                        (a * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
                    const y =
                        (a * Math.cos(t) * Math.sin(t)) /
                        (1 + Math.sin(t) * Math.sin(t));

                    // Calculate tangent for wobble and rotation
                    const dt = 0.01;
                    const t2 = t + dt;
                    const x2 =
                        (a * Math.cos(t2)) / (1 + Math.sin(t2) * Math.sin(t2));
                    const y2 =
                        (a * Math.cos(t2) * Math.sin(t2)) /
                        (1 + Math.sin(t2) * Math.sin(t2));
                    const dxdt = x2 - x;
                    const dydt = y2 - y;
                    const pathAngle = Math.atan2(dydt, dxdt);

                    // Wobble perpendicular to tangent
                    const wobbleAmplitude = 16;
                    const wobbleFrequency = 3;
                    const wobble =
                        Math.sin(t * wobbleFrequency) * wobbleAmplitude;
                    const wobbleX = Math.cos(pathAngle + Math.PI / 2) * wobble;
                    const wobbleY = Math.sin(pathAngle + Math.PI / 2) * wobble;

                    // Smoothly interpolate bee position to loop path + wobble
                    const loopLerp = 0.08; // Lower = slower, smoother transition
                    const targetX = pointer.worldX + x + wobbleX;
                    const targetY = pointer.worldY + y + wobbleY;
                    this.bee.x += (targetX - this.bee.x) * loopLerp;
                    this.bee.y += (targetY - this.bee.y) * loopLerp;

                    // Rotate to face tangent direction, with extra wobble
                    this.bee.rotation =
                        pathAngle - Math.PI / 2 + Math.sin(t * 2) * 0.25;
                } else {
                    // --- Wavy Line Animation Directly Towards Cursor ---
                    const followSpeed = 0.05;
                    this.bee.x += (pointer.worldX - this.bee.x) * followSpeed;
                    this.bee.y += (pointer.worldY - this.bee.y) * followSpeed;

                    // Add sine wave offset perpendicular to movement direction
                    const t = this.beeIdleTime / 1000;
                    const waveAmplitude = 10;
                    const waveFrequency = 2;
                    const angle = Math.atan2(
                        pointer.worldY - this.bee.y,
                        pointer.worldX - this.bee.x
                    );

                    this.bee.x +=
                        Math.cos(angle + Math.PI / 2) *
                        Math.sin(t * waveFrequency) *
                        waveAmplitude;
                    this.bee.y +=
                        Math.sin(angle + Math.PI / 2) *
                        Math.sin(t * waveFrequency) *
                        waveAmplitude;

                    // Rotate to face pointer, with wobble
                    this.bee.rotation =
                        angle - Math.PI / 2 + Math.sin(t * 2) * 0.2;
                }
            } else {
                // --- Move bee directly towards cursor ---
                const angle = Phaser.Math.Angle.Between(
                    beeCenterX,
                    beeBottomY,
                    pointer.worldX,
                    pointer.worldY
                );
                const targetRotation = angle - Math.PI / 2;
                this.bee.rotation = targetRotation;

                const beeSpeed = 12;
                if (distance > 5) {
                    this.bee.x += Math.cos(angle) * beeSpeed;
                    this.bee.y += Math.sin(angle) * beeSpeed;
                }
            }

            // Prevent bee from going below ground
            if (this.bee.y > groundY + 16 * 3) {
                this.bee.y = groundY + 16 * 3;
            }

            this.lastBeeUpdateTime = time;
        }

        for (let i = 0; i < this.clouds.length; i++) {
            const cloud = this.clouds[i];
            const speed = i === 0 ? 0.5 : 0.3; // Different speeds for variety
            cloud.x += speed;

            // If cloud goes off right edge, reset to left
            if (cloud.x > this.scale.width + cloud.displayWidth / 2) {
                cloud.x = -cloud.displayWidth / 2;
            }
        }

        this.lastPointerX = this.input.activePointer.worldX;
        this.lastPointerY = this.input.activePointer.worldY;
    }
}

export default GameScene;
