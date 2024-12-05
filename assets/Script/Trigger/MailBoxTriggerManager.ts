import { _decorator , Node} from 'cc';

import { ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum } from "../Enum";
import { TriggerManager } from "./TriggerManager";
import DataManager from '../Runtime/DataManager';


const { ccclass, property } = _decorator;


@ccclass('MailBoxTriggerManager')
export class MailBoxTriggerManager extends TriggerManager {

    type: TriggerTypeEnum = TriggerTypeEnum.MailBox;

    @property(Node)
    closeNode: Node = null;

    @property(Node)
    openNode: Node = null;

    render(){
      super.render();
      const open = DataManager.Instance.mailBoxStatus === TriggerStatusEnum.Resolved;
      this.openNode.active = open;
      this.closeNode.active = !open;
    }

    handleTrigger(){
      //使用钥匙打开邮箱获得船票
      if(DataManager.Instance.curItemType === ItemTypeEnum.Key && DataManager.Instance.isSelect){
        DataManager.Instance.curItemType = null;
        DataManager.Instance.isSelect = false;
        DataManager.Instance.items.find(item => item.type === ItemTypeEnum.Key).status = ItemStatusEnum.Disable;
        DataManager.Instance.items.find(item => item.type === ItemTypeEnum.Mail).status = ItemStatusEnum.Scene;
        DataManager.Instance.items = [...DataManager.Instance.items];//重新赋值刷新渲染
        DataManager.Instance.mailBoxStatus = TriggerStatusEnum.Resolved;

      }
    }
}
