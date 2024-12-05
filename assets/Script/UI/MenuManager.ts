
import { _decorator, Component, director, Node } from 'cc';

import { SceneEnum } from '../Enum';
const { ccclass, property } = _decorator;


@ccclass('MenuManager')
export class MenuManager extends Component {
  type: SceneEnum = SceneEnum.Menu;

  handleBackMenu() {
    director.loadScene(SceneEnum.Menu);
  }

}


