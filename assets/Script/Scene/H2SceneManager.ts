
import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { SceneManager } from './SceneManager';
import { ItemStatusEnum, ItemTypeEnum, SceneEnum } from '../Enum';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;


@ccclass('H2SceneManager')
export class H2SceneManager extends SceneManager {

  @property(Prefab)
  keyPrefab: Prefab = null;

  @property(Node)
  keyPlaceholder: Node = null;

  type: SceneEnum = SceneEnum.H2;

  render(): void {
    super.render();
    this.items.destroyAllChildren();

    const key = DataManager.Instance.items.find(item => item.type === ItemTypeEnum.Key);
    if(key && key.status === ItemStatusEnum.Scene){
      const keyNode = instantiate(this.keyPrefab);
      this.items.addChild(keyNode);
      keyNode.setPosition(this.keyPlaceholder.position);
    }
  }
}


