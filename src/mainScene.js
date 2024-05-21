import Inventory from "./inventory.js";
import PhaserTooltip from "./PhaserTooltip.js";

export default class Main extends Phaser.Scene {
    constructor() {
        super({ key: "scene" });
    }
    
    // main methods
    preload() {
        this.load.image('inventoryContainer', '../assets/Inv.png');
        this.load.image("waterting", "../assets/Tools.png");
        this.load.image("sword", "../assets/Sword.png");
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        
        this.load.scenePlugin('PhaserTooltip', PhaserTooltip, 'PhaserTooltip', 'tooltip');
        
        
    }
    

    create() {
        
        this.inv = new Inventory({
            x: 640,
            y: 950,
            orientationY: false,
            key: "inventoryContainer",
            space: 5,
            width: 150,
            height: 150,
            padding: 10
        }, this);
        
        this.inv.addItem("waterting", {
            qountity: 5,
            text: "waterting"
        });
        
        this.inv.addItem("sword", {
            qountity: 2,
            text: "sword"
        });
        
        
        this.inv.removeItem("sword", 1)
        
    }
    
    update() {
        this.inv.update();
    }
    
  
}


