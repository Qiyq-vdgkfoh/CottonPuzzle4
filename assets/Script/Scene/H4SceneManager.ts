
import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { SceneManager } from './SceneManager';
import DataManager from '../Runtime/DataManager';
import { ItemStatusEnum, ItemTypeEnum, SceneEnum } from '../Enum';
const { ccclass, property } = _decorator;


@ccclass('H4SceneManager')
export class H4SceneManager extends SceneManager {
  @property(Prefab)
  MailPrefab: Prefab = null;

  @property(Node)
  MailPlaceholder: Node = null;

  type: SceneEnum = SceneEnum.H4;

  render(): void {
    super.render();
    this.items.destroyAllChildren();

    const mail = DataManager.Instance.items.find(item => item.type === ItemTypeEnum.Mail);
    if(mail && mail.status === ItemStatusEnum.Scene){
      const MailNode = instantiate(this.MailPrefab);
      this.items.addChild(MailNode);
      MailNode.setPosition(this.MailPlaceholder.position);
    }
  }
}


