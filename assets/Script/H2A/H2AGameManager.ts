
import { _decorator, Component, director, instantiate, isCustomTargetModifier, Node, Prefab, UITransform } from 'cc';
import { RenderManager } from '../Base/RenderManager';
import { CircleManager } from './CircleManager';
import DataManager from '../Runtime/DataManager';
import { SceneEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum';

const { ccclass, property } = _decorator;

const CIRCLE_RADIUS = 80;

@ccclass('H2AGameManager')
export class H2AGameManager extends RenderManager {

  @property([CircleManager])
  circles: CircleManager[] = [];

  @property(Node)
  lines: Node = null;

  @property(Prefab)
  line: Prefab = null;

  @property([Prefab])
  contentPrefab: Prefab[] = [];

  private circlesMap: Map<CircleManager, CircleManager[]> = new Map();

  start() {
    super.start();
    this.generateCirclesMap();
    this.generateLines();
    this.checkSuccess();
  }

  generateCirclesMap(){
    this.circlesMap.set(this.circles[0], [this.circles[1], this.circles[4], this.circles[6]]);
    this.circlesMap.set(this.circles[1], [this.circles[0], this.circles[5], this.circles[6]]);
    this.circlesMap.set(this.circles[2], [this.circles[4], this.circles[6]]);
    this.circlesMap.set(this.circles[3], [this.circles[5], this.circles[6]]);
    this.circlesMap.set(this.circles[4], [this.circles[0], this.circles[2], this.circles[5], this.circles[6]]);
    this.circlesMap.set(this.circles[5], [this.circles[1], this.circles[3], this.circles[4], this.circles[6]]);
    this.circlesMap.set(this.circles[6], [this.circles[0], this.circles[1], this.circles[2], this.circles[3], this.circles[4], this.circles[5]]);

    for(let i = 0; i < this.circles.length; i++){
      const circle = this.circles[i];
      circle.index = i;
    }
  }

  generateLines(){
    for(const [curCircle, circles] of this.circlesMap){
      for(const nextCircle of circles){
        const curIndex = this.circles.findIndex(i => i === curCircle);
        const nextIndex = this.circles.findIndex(i => i === nextCircle);
        if(curIndex < nextIndex){
          this.generateLine(curCircle, nextCircle);
        }
      }
    }
  }

  generateLine(curCircle: CircleManager, nextCircle: CircleManager){
    const line = instantiate(this.line);

    const {x: x1, y: y1} = curCircle.node.position;
    const {x: x2, y: y2} = nextCircle.node.position;

    //设置位置两点中心
    const x = (x1 + x2) / 2;
    const y = (y1 + y2) / 2;
    line.setPosition(x, y);

    //通过勾股定理求两点距离设置长度
    const side1 = Math.abs(x1 - x2);
    const side2 = Math.abs(y1 - y2);
    const side3 = Math.sqrt(side1 * side1 + side2 * side2);
    const uiTransform = line.getComponent(UITransform);
    uiTransform.setContentSize(side3 - 2*CIRCLE_RADIUS, uiTransform.contentSize.height);

    //通过弧度求角度，弧度 = 弧长 / 半径，一周弧度 = 2*PI*r / r = 2PI (rad) = 360°
    const rad = Math.atan(side2 / side1);
    const angle = rad * 180 / Math.PI;
    const sign = (x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2) ? 1 : -1;
    line.setRotationFromEuler(0, 0, sign * angle);

    this.lines.addChild(line);
  }

  render(){
    for(let i = 0; i < this.circles.length; i++){
      const circle = this.circles[i];
      circle.node.destroyAllChildren();

      const contentIndex = DataManager.Instance.H2AData[i];
      if(contentIndex !== null && this.contentPrefab[contentIndex]){
        const content = instantiate(this.contentPrefab[contentIndex]);
        circle.node.addChild(content);
      }
    }
  }

  //圆圈按钮点击事件函数
  handleCircleTouch(e: Event, _index: string){
    if(DataManager.Instance.doorStatus === TriggerStatusEnum.Resolved){
      return;
    }

    const index = parseInt(_index);
    const curCircleContentIndex = DataManager.Instance.H2AData[index];
    if(curCircleContentIndex === null){
      return;
    }

    const curCircle = this.circles[index];
    const circles = this.circlesMap.get(curCircle);
    for(let i = 0; i < circles.length; i++){
      const circle = circles[i];

      const nullIndex = DataManager.Instance.H2AData.findIndex(i => i === null);
      const circleIndex = this.circles.findIndex(i => i === circle);
      if(nullIndex === circleIndex){
        DataManager.Instance.H2AData[circle.index] = curCircleContentIndex;
        DataManager.Instance.H2AData[index] = null;
        DataManager.Instance.H2AData = [...DataManager.Instance.H2AData];
      }
    }

    this.checkSuccess();
  }

  checkSuccess(){
    if(DataManager.Instance.H2AData.every((every, i) => every === DataManager.Instance.H2AAnswer[i])){
      DataManager.Instance.doorStatus = TriggerStatusEnum.Resolved;
      // director.loadScene(SceneEnum.H2);
      DataManager.Instance.curScene = SceneEnum.H2
    }
  }

  resetContent(){
    DataManager.Instance.H2AData = [...DataManager.Instance.H2AInitData];
  }
}
