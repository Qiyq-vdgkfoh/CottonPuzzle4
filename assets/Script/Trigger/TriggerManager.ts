import { _decorator } from "cc";
import { RenderManager } from "../Base/RenderManager";
import { TriggerTypeEnum } from "../Enum";


const { ccclass, property } = _decorator;


@ccclass('TriggerManager')
export abstract class TriggerManager extends RenderManager {

    type: TriggerTypeEnum

    render(){

    }

    abstract handleTrigger():void
  }
