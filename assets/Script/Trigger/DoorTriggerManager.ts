import { _decorator , director, Node, Sprite} from 'cc';

import { ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum, TriggerTypeEnum } from "../Enum";
import { TriggerManager } from "./TriggerManager";
import DataManager from '../Runtime/DataManager';


const { ccclass, property } = _decorator;


@ccclass('DoorTriggerManager')
export class DoorTriggerManager extends TriggerManager {

    type: TriggerTypeEnum = TriggerTypeEnum.Door;



    render(){
      super.render();
      this.getComponent(Sprite).enabled = DataManager.Instance.doorStatus == TriggerStatusEnum.Pengind;
    }

    handleTrigger(){
      if(DataManager.Instance.doorStatus === TriggerStatusEnum.Pengind){
        DataManager.Instance.curScene = SceneEnum.H2A;
      } else{
        DataManager.Instance.curScene = SceneEnum.H3;
      }
    }
}
