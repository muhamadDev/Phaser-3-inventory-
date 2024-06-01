# a phaser 3 inventory system
this is a simple inventory system that build using rexuiplugin and PhaserTooltip
you can add as many as you want 

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
this.sizers = this.physics.add.group();

this.inv = new Inventory({
    x: 1220, // number
    y: 100,  //number
    key: "inventoryContainer", // string
    id: 0, // number
    orientationY: true, // bloan
    tooltitOffset: { x: 0, y: 0}, // {number, number}
    space: 5, // number
    width: 70, // number
    height: 70, // number
    padding: 10, // number
    scrollFactor: 0, // number
    onClickCallback: (item, pointer) => {
        // onClickCallback a function
    },
    onDbClick: (item, pointer) => {
    } 
        
    inventorys: [] // array of other inventorys
}, this); 
```

# Note
- `this.sizers = this.physics.add.group();` only once for all inventories you create
- `x,y` is the position of the inventory
- `key` is the inventory's container key
- `id` each inventory must have unique Id
- `orientationY` the inventory should be on Y-axis? 
- `tooltitOffset` the tooltips offset
- `space` how how many species should it have?
- `width` container width
- `height` container height
- `padding` padding between each container
- `scrollFactor` the scrollFactor of the containers
- `onClickCallback` when you click one item what should happen?
- `onDbClick` when you double click one item what should happen?
- `inventorys` an array of other inventories

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

8- for destroying the inventory

```
this.inv.containerGroup.clear(true,true);
```

9- for opening the inventory

```
this.inv.open()
```


10- for closing the inventory 

```
this.inv.close()
```

11- for adding more inventories property 
```
this.inv.addInventorys(this.inv2);
```
12- if you double click an item inside a inventory
    the item will go to another inventory that is open


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
            x: 1220, 
            y: 100, 
            key: "inventoryContainer",
            id: 0,
            orientationY: true, 
            tooltitOffset: { x: 0, y: 0}, 
            space: 5,
            width: 70,
            height: 70, 
            padding: 10, 
            scrollFactor: 0, //
            onClickCallback: (item, pointer) => {
                console.log(item)
            },
            inventorys: null    
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
