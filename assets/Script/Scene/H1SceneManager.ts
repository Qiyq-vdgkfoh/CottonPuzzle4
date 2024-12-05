
import { _decorator, Component, Node } from 'cc';
import { SceneManager } from './SceneManager';
import { SceneEnum } from '../Enum';
const { ccclass, property } = _decorator;


@ccclass('H1SceneManager')
export class H1SceneManager extends SceneManager {
  type: SceneEnum = SceneEnum.H1;
}


