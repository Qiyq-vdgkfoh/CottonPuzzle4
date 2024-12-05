
import { _decorator, CCInteger, Component, Node, Sprite, SpriteFrame } from 'cc';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';

const { ccclass, property } = _decorator;


@ccclass('ContentManager')
export class ContentManager extends RenderManager {

  @property(SpriteFrame)
  normalSf: SpriteFrame = null;

  @property(SpriteFrame)
  successSf: SpriteFrame = null;

  @property(CCInteger)
  index: number;

  render(){
    const curIndex = DataManager.Instance.H2AData.findIndex(i => i === this.index);
    const answerIndex = DataManager.Instance.H2AAnswer.findIndex(i => i === this.index);
    this.getComponent(Sprite).spriteFrame = curIndex === answerIndex ? this.successSf : this.normalSf;
  }

}
