import * as PIXI from 'pixi.js'

export class Enemy extends PIXI.Sprite {
    public deadTexture: PIXI.Texture;
    public fishTexture: PIXI.Texture;
    public alive = true;
    private speed: number;

    constructor(texture: PIXI.Texture, deadTexture: PIXI.Texture) {
        super(texture)
        this.deadTexture = deadTexture
        this.fishTexture = texture

        //Randomized Stats
        this.anchor.set(0.5);
        this.x = Math.random() * 800;
        this.y = Math.random() * 450;
        this.scale.set(0.75 + Math.random() * 0.5);
        this.speed = Math.random() * 3;
        this.tint = Math.random() * 0xFFFFFF

        //Hitbox
        // let area = this.getBounds()
        // let greenbox = new PIXI.Graphics()
        // greenbox.lineStyle(2, 0x33FF33, 1)
        // greenbox.drawRect(0, 0, area.width, area.height)
        // this.addChild(greenbox)
    }

    update(delta: number) {
        if (this.alive == true) {
            this.x *= 1
            this.x += this.speed
        } else {
            this.x *= 1
            this.rotation += 0.1
            this.x += this.speed * 2
        }

        if (this.x > 900) {
            this.x = -100
        }
    }
}