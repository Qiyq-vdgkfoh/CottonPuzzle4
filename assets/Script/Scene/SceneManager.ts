
import { _decorator, Component, director, Node, Event, Prefab, instantiate } from 'cc';
import { SceneEnum } from '../Enum';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
import { MenuManager } from './../UI/MenuManager';
const { ccclass, property } = _decorator;


@ccclass('SceneManager')
export class SceneManager extends RenderManager {

    @property(Node)
    items: Node = null;

    @property(Prefab)
    inventory: Prefab = null;

    @property(Prefab)
    menu: Prefab = null;

    type: SceneEnum;

    start(){
        super.start();
        director.preloadScene(SceneEnum.H1);
        director.preloadScene(SceneEnum.H2);
        director.preloadScene(SceneEnum.H3);
        director.preloadScene(SceneEnum.H4);

        if(this.inventory){
            const inventory = instantiate(this.inventory);
            this.node.addChild(inventory);
        }
        if(this.menu){
            const menu = instantiate(this.menu);
            this.node.addChild(menu);
        }
    }

    changeScene(e:Event, scene:string) {
        // director.loadScene(scene as SceneEnum);
        DataManager.Instance.curScene = scene as SceneEnum;
    }

    render(): void {
        if(DataManager.Instance.curScene === this.type){
            return;
        }
        director.loadScene(DataManager.Instance.curScene);
    }
}

