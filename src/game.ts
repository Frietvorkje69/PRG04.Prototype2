import * as PIXI from 'pixi.js'
import { Enemy } from "./enemy"
import { Player } from "./player"

import enemyImage from "./images/enemy.png"
import playerImage from "./images/player.png"
import deathImage from "./images/enemyhurt.png"
import backgroundImage from "./images/background.png"

//
// Create Game class
//
class Game {
    enemy: Enemy
    mylistener: EventListener
    pixi: PIXI.Application
    loader: PIXI.Loader
    enemies: Enemy[] = []
    player: Player;

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.mylistener = (e: Event) => this.logMessage(e)
        window.addEventListener('click', this.mylistener)

        //loader
        this.pixi.loader.add('enemyTexture', enemyImage)
            .add('playerTexture', playerImage)
            .add('deadTexture', deathImage)
            .add('backgroundTexture', backgroundImage)
        this.pixi.loader.load(() => this.loadCompleted())
    }

    //hier zet hij de event listeners uit
    logMessage(e: Event) {
        console.log("niet meer")
        window.removeEventListener("click", this.mylistener)
    }

    loadCompleted() {
        const background = new PIXI.TilingSprite(this.pixi.loader.resources["backgroundTexture"].texture!,
            this.pixi.screen.width,
            this.pixi.screen.height)

        this.pixi.stage.addChild(background)

        //moving background
        let count = 0;

        this.pixi.ticker.add(() => {
            count += 0.005;

            background.tilePosition.x += 1;
        });


        //add animation and interaction
        this.pixi.ticker.add((delta) => this.update(delta))

        for (let i = 0; i < 5; i++) {
            this.enemy = new Enemy(this.pixi.loader.resources["enemyTexture"].texture!, this.pixi.loader.resources["deadTexture"].texture!)
            this.enemies.push(this.enemy)
            this.pixi.stage.addChild(this.enemy)
        }
        this.player = new Player(this.pixi.loader.resources["playerTexture"].texture!)
        this.pixi.stage.addChild(this.player)
    }

    update(delta: number) {
        for (let enemy of this.enemies) {
            enemy.update(delta)
            if (this.collision(this.player, enemy)) {
                if (enemy.alive) {
                    enemy.alive = !enemy.alive;
                    enemy.texture = enemy.deadTexture
                    // let textbox = new PIXI.Sprite(this.loader.resources["textbox"].texture!)
                
                    // this.pixi.stage.addChild(textbox)
                    console.log("player touches enemy 💀")
                }
            }
        }
        this.player.update(delta)
    }

    collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}
new Game()