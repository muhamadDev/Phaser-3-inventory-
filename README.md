# a phaser 3 inventory system

![sample](https://github.com/muhamadDev/Phaser-3-inventory-/blob/main/sample.gif)

# Usage

1- download this two files `inventory.js`, `PhaserTooltip.js` in src directry

2- `import Inventory from "./pathTo/inventory.js"` and  `import PhaserTooltip from "./pathTo/PhaserTooltip.js";` in the scene file

3 - load the plugins in preload methood
 
```
this.load.scenePlugin({
    key: 'rexuiplugin',
    url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
});
        
this.load.scenePlugin('PhaserTooltip', PhaserTooltip, 'PhaserTooltip', 'tooltip');
```

4- create inventory in create methood
```
this.inv = new Inventory({
    x: 100, // x-position: number
    y: 100, // y-position: number
    orientationY: false, // bolean
    key: "inventoryContainer", // background key: string
    scrollFactor: 1, // mumber 
    tooltitOffset: { x: 0, y: 0}, // 
    space: 5, // how much space have: number
    width: 150, // container width: number
    height: 150, // comtainer height: number
    padding: 10, // padding bewteen each container: number
    onClickCallback: (item, pointer) => {
        console.log(item)
    }
}, this);
```
5- update inventory in update methood
```
this.inv.update();
```


6- for adding item to inventory 

```
this.inv.addItem("key", {
    qountity: 5, // number
    text: "tool" // tooltips text : string
});
```
note: "key" is item's key

7- for removing item from inventory 
```
this.inv.removeItem("key", 1)
```
note: 1 is qountity

# the code should be look like this
```
import Inventory from "./inventory.js";
import PhaserTooltip from "./PhaserTooltip.js";

export default class Main extends Phaser.Scene {
    constructor() {
        super({ key: "scene" });
    }
    
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
            x: 200,
            y: 200,
            orientationY: false,
            key: "inventoryContainer",
            scrollFactor: 1,
            tooltitOffset: { x: 0, y: 0} 
            space: 5,
            width: 150,
            height: 150,
            padding: 10,
            onClickCallback: (item, pointer) => {
                console.log(item)
            }
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



```
