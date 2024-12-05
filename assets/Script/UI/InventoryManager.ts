
import { _decorator, Button, Component, instantiate, Label, Node, Prefab } from 'cc';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
import { ItemManager } from '../Item/ItemManager';

const { ccclass, property } = _decorator;


@ccclass('InventoryManager')
export class InventoryManager extends RenderManager {

  @property(Prefab)
  keyPrefab: Prefab = null;

  @property(Prefab)
  mailPrefab: Prefab = null;

  @property(Label)
  label: Label = null;

  @property(Button)
  leftBtn: Button = null;

  @property(Button)
  rightBtn: Button = null;

  @property(Node)
  placeholder: Node = null;//道具栏（背包）

  @property(Node)
  hand: Node = null;


  render(){
    this.placeholder.destroyAllChildren();
    const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory);
    this.node.active = isInventoryItems.length > 0;//如果没有物品在背包中则让该节点消失不执行后续代码
    if(isInventoryItems.length){
      if(DataManager.Instance.curItemType){
        //再次判断当前所选物品是否在背包中，以防其已被使用掉却每及时更新
        const item = DataManager.Instance.items.find(i => i.type === DataManager.Instance.curItemType);
        if(item.status === ItemStatusEnum.Inventory){
          this.generateItem(DataManager.Instance.curItemType);
        }else{
          const type = isInventoryItems[0].type;
          this.generateItem(type);
          DataManager.Instance.curItemType = type;
        }
      }else{
        //背包物品第一次渲染，即背包中有物品而当前却没有选择到物品
        const type = isInventoryItems[0].type;
        this.generateItem(type);
        DataManager.Instance.curItemType = type;
      }
    }

    //判断是否需要显示手(背包是否有物品以及物品是否被选中)
    this.hand.active = Boolean(DataManager.Instance.curItemType) && DataManager.Instance.isSelect;
    this.changeBtnInteractable();
  }

  generateItem(type: ItemTypeEnum){
    switch(type){
      case ItemTypeEnum.Key:
        const keyNode = instantiate(this.keyPrefab);
        this.placeholder.addChild(keyNode);
        this.label.string = keyNode.getComponent(ItemManager).label;
        break;
      case ItemTypeEnum.Mail:
        const mailNode = instantiate(this.mailPrefab);
        this.placeholder.addChild(mailNode);
        this.label.string = mailNode.getComponent(ItemManager).label;
        break;
      default:
        break;
    }
  }

  handleSelect(){
    //点击切换物品是否选中状态，由Button组件的点击事件触发
    DataManager.Instance.isSelect = !DataManager.Instance.isSelect;
    // console.log("isSelect: "+DataManager.Instance.isSelect);
  }

  handleLeftBtn(){
    if(DataManager.Instance.curItemType === null){
      return;
    }

    const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory);
    const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType);
    if(index > 0){
      DataManager.Instance.isSelect = false;
      DataManager.Instance.curItemType = isInventoryItems[index - 1].type;
    }
  }

  handleRightBtn(){
    if(DataManager.Instance.curItemType === null){
      return;
    }

    const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory);
    const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType);
    if(index < isInventoryItems.length - 1){
      DataManager.Instance.isSelect = false;
      DataManager.Instance.curItemType = isInventoryItems[index + 1].type;
    }
  }

  changeBtnInteractable(){
    if(DataManager.Instance.curItemType === null){
      this.leftBtn.interactable = false;
      this.rightBtn.interactable = false;
      return;
    }

    const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory);
    const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType);
    this.leftBtn.interactable = index > 0;
    this.rightBtn.interactable = index < isInventoryItems.length - 1;
  }

}
