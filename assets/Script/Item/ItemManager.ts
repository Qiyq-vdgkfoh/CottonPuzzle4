
import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
import DataManager from '../Runtime/DataManager';
import { RenderManager } from '../Base/RenderManager';
const { ccclass, property } = _decorator;


@ccclass('ItemManager')
export class ItemManager extends RenderManager {

    label = "物品";
    // status: ItemStatusEnum;物品(IItem:{status,type})上传数据中心，通过数据中心来变更物品状态
    type: ItemTypeEnum;

    //物品的两种状态图片：在场景和在背包
    @property(SpriteFrame)
    sceneSF: SpriteFrame = null;

    @property(SpriteFrame)
    inventorySF: SpriteFrame = null;

    start(){
        super.start();
        //绑定点击改变状态事件
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
    }
    onDestroy() {
        super.onDestroy();
        this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    touchEnd(){
        // if(this.status === ItemStatusEnum.Scene){
        //     this.status = ItemStatusEnum.Inventory;
        // }

        // console.log('物品被点击');
        const item = DataManager.Instance.items.find(item => item.type === this.type);
        if(!item){
            // console.log('物品不存在');
            return;
        }

        if(item.status === ItemStatusEnum.Scene){
            item.status = ItemStatusEnum.Inventory;
            DataManager.Instance.items = [...DataManager.Instance.items];
        }
    }

    render(): void {
        //根据物品不同的状态变更渲染对应的图片
        const status = DataManager.Instance.items.find(item => item.type === this.type)?.status;
        const spriteComponent = this.getComponent(Sprite);
        switch (status) {
            case ItemStatusEnum.Scene:
                this.node.active = true;
                spriteComponent.spriteFrame = this.sceneSF;
                break;
            case ItemStatusEnum.Inventory:
                this.node.active = true;
                spriteComponent.spriteFrame = this.inventorySF;
                break;
            case ItemStatusEnum.Disable:
                this.node.active = false;
                break;
            default:
                break;
        }
    }
}
