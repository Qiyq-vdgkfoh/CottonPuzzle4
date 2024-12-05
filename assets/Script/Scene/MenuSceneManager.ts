
import { _decorator, Component, director, Node } from 'cc';
import { SceneManager } from './SceneManager';
import { SceneEnum } from '../Enum';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;


@ccclass('MenuSceneManager')
export class MenuSceneManager extends SceneManager {
  type: SceneEnum = SceneEnum.Menu;

  handleNewGame() {
    DataManager.Instance.reset();
    director.loadScene(SceneEnum.H1);
  }

  handleContinue() {
    DataManager.Instance.restore();
    director.loadScene(DataManager.Instance.curScene);
  }

  render(): void {
    //此类中场景跳转不经过数据中心变更数据，所以重写忽略父类渲染方法
  }
}


