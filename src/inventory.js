import PhaserTooltip from "./PhaserTooltip.js";

export default class Inventory {
    constructor(options, scene) {
        this.x = options.x || 90;
        this.y = options.y || 90;
        this.key = options.key;
        this.space = options.space || 3;
        this.width = options.width || 100;
        this.height = options.height || this.width;
        this.padding = options.padding + this.width || 160;
        this.orientationY = options.orientationY || false;
        this.scene = scene;
        
        this.containerGroup = scene.physics.add.group();
        
        for (let i = 0; i < this.space; i++) {
            let posi = this.getDirection(i)
            
            let container = this.createPanel(scene, 0, 'text');
            container.setPosition(posi.x, posi.y).layout();
            container.setInteractive({ dropZone: true });
            
            this.containerGroup.add(container);
        }
        
        
        this.containerGroup.getChildren().forEach((container) => {
            this.setEvents(container.getElement('items'));
        });
        
        this.allToolTips = [];
    }
    
    addItem(icon, itemInfo) {
        
        let notExist = 0;
        
        this.containerGroup.getChildren().forEach((container, index) => {
            
            if(container.getElement('items')[0]?.data.values.key === icon) {
                
                container.getElement('items')[0].data.values.qountity += 1;
                return
            }
            
            notExist++
        });
        
        if (notExist <= this.space -1) return;
        
        let firstTime = true;
        
        this.containerGroup.getChildren().forEach((container, index) => {
            
            if (container.data.values.isFull) return;
            
            if(!firstTime) return;
            
            let posi = { x: container.x, y: container.y };
            
            container.data.values.isFull = true;
            container.destroy();
            
            container = this.createPanel(this, 1, icon, itemInfo)
            .setPosition(posi.x, posi.y).layout();
            
            container.setInteractive({ dropZone: true });
            
            this.setEvents(container.getElement('items'));
            this.containerGroup.add(container);
            firstTime = false;
            
        
            
        });
    
    }
    
    
    removeItem(icon, qountity = 1) {
        let notExist = 0;
        
        this.containerGroup.getChildren().forEach((container, index) => {
        
            if (container.getElement('items')[0]?.data.values.key !== icon) {
                console.log("not found")
                notExist++
                return
            };
            
            if (container.getElement('items')[0].data.values.qountity <= 1) {
                container.remove(container.getElement('items')[0], true);
                return
            }
            
            container.getElement('items')[0].data.values.qountity -= qountity;
            
            if (container.getElement('items')[0].data.values.qountity <= 0) {
                container.remove(container.getElement('items')[0], true);
                return
            }
            
        });
        
    }


    createPanel(scene, itemCount = 0, text, itemInfo) {
        
        let sizer = this.scene.rexUI.add.sizer({
            width: this.width, height: this.height,
            orientation: 'y',
            space: { left: 6, right: 6, top: 6, bottom: 6, item: 1} 
        });
        
        sizer.setDepth(-1);
        sizer.addBackground(this.scene.add.image(0,0, this.key).setDepth(-1));
      
        sizer.setData('isFull', false)
        .setDepth(150)
        .setScrollFactor(0)
        .text = text;
        
        for (let i = 0; i < itemCount; i++) {
            
            sizer.add(
                this.createLabel(scene, text, sizer, itemInfo).setDepth(155),
                {expand: true }
            );
            
        }
        return sizer;
    }
    
    createLabel(scene, icon, parent, itemInfo) {
        let label = this.scene.rexUI.add.label({
            icon: this.scene.add.image(0,0, icon).setScale(2.5),
            name: icon,
            
            width: this.width - 30,
            height: this.height - 30,
            align: 'center',
            space: {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5 
            }
            
        });
        
        label.setData('qountity', itemInfo?.qountity || 1);
        label.setData('key', icon || 1);
        label.setData('info', itemInfo || {});
        
        parent.data.values.isFull = true;
        return label;
    }
    
    setEvents(items) {
        
        items.forEach((item) => {
            item.setInteractive({ draggable: true });
            
            item.on('dragstart', (pointer, dragX, dragY) => {
                
              item.setData({ startX: item.x, startY: item.y });
              
            });
            
            item.on('drag', (pointer, dragX, dragY) => {
                
              item.setPosition(dragX, dragY);
              
            });
            
            item.on('dragend', (pointer, dragX, dragY, dropped) => {
                if (dropped) { 
                    return;
                }
                
                item.moveTo({
                    x: item.getData('startX'), y: item.getData('startY'),
                    speed: 800
                });
                
            });
            
            item.on('drop', (pointer, panel) => {
                
                if (panel.data.values.isFull) {
                    
                    item.moveTo({
                        x: item.getData('startX'), y: item.getData('startY'),
                        speed: 300
                    });
                    
                    return
                    
                }
                
                let parent = item.getParentSizer();
                parent.data.values.isFull = false;
              
                parent.remove(item);
                this.arrangeItems(parent);
                
                panel.insertAtPosition(
                    pointer.x, pointer.y,
                    item,
                    {expand: true }
                );
                
                panel.data.values.isFull = true
                this.arrangeItems(panel);
                
            });
            
            let text = `${item.data.get("info").text} ${item.data.get("qountity")}` 
            this.addTooltip(item, text );
        });
    }

    arrangeItems(panel) {
        let items = panel.getElement('items');
        
        items.forEach((item) => {
            item.setData({ startX: item.x, startY: item.y });
        });
        
        panel.layout();
        
        items.forEach((item) => {
            
            item.moveFrom({
                x: item.getData('startX'), y: item.getData('startY'),
                speed: 300 
            });
            
        });
    }
    
    getDirection(i) {
        let posi;
        if (this.orientationY) {
            posi = {
                x: this.x,
                y: this.y + (this.padding * i),
            };
        } else {
            posi = {
                x: this.x + (this.padding * i),
                y: this.y,
            };
        }
        return posi;
        
    }
    
    addTooltip(item, content, scene = this.scene) {
        
        let tooltipID = scene.tooltipID = Math.random() * 10000;
        let toolTips = scene.tooltip.createTooltip({
            x: item.x - 50,
            y: item.y - 150,
            hasBackground: true,
            text: {
                text: content
            },
            background: {
                width: 100,
                height: 50
            },
            id: tooltipID,
            target: item
        });
    
        scene.tooltip.hideTooltip(tooltipID);
    
        item.setInteractive();
    
        item.on('pointerover', (pointer, item) => {
            scene.tooltip.showTooltip(tooltipID, true);
        }, scene);
    
        item.on('pointerout', (pointer, item) => {
            scene.tooltip.hideTooltip(tooltipID, true);
        }, scene);
        
        this.allToolTips.push({
            item: toolTips,
            id: tooltipID,
        });
    }
    
    update() {
        this.allToolTips.forEach((item) => {
            
            var pad = this.scene.tooltip.getPadding(item.id);
            var hPadding = pad.paddingLeft + pad.paddingRight;
            var targetX = this.scene.tooltip.getTarget(item.id).getBounds().centerX;
            
            item.item.x = targetX - (item.item.getBounds().width + hPadding) * 0.5;
            item.item.y = this.scene.tooltip.getTarget(item.id).getBounds().y - 150;
            
        })
    }
    
}

