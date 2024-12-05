import { sys } from "cc";
import Singleton from "../Base/Singleton";
import { EventEnum, ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum } from "../Enum";
import EventManager from "./EventManager";


interface IItem {
  status: ItemStatusEnum;
  type: ItemTypeEnum;
}

const STORAGE_KEY = 'STORAGE_KEY';

export default class DataManager extends Singleton {

  static get Instance(){
    //不是重写(也不是重载)，而是调用父类的GetInstance方法
    return super.GetInstance<DataManager>();
  }

  private _items: Array<IItem> = [
    { status: ItemStatusEnum.Scene, type: ItemTypeEnum.Key },
    { status: ItemStatusEnum.Disable, type: ItemTypeEnum.Mail }
  ];
  private _curItemType: ItemTypeEnum | null = null;//背包里当前选中的物品类型

  private _isSelect: boolean = false;//是否选中物品,用于判断手是否需要隐藏

  private _mailBoxStatus: TriggerStatusEnum = TriggerStatusEnum.Pengind;

  private _grandmaStatus: TriggerStatusEnum = TriggerStatusEnum.Pengind;
  private _grandmaDialogIndex: number = -1;

  private _doorStatus: TriggerStatusEnum = TriggerStatusEnum.Pengind;

  readonly H2AAnswer = [0, 1, 2, 3, 4, 5, null];
  readonly H2AInitData = [1, 0, 3, 2, 5, 4, null];
  private _H2AData = [...this.H2AInitData];

  private _curScene: SceneEnum = SceneEnum.H1;

  get items(): Array<IItem> {
    return this._items;
  }
  set items(newData: Array<IItem>) {
    this._items = newData;
    //数据改变时驱动UI渲染更新
    this.renderAndSave();
  }

  get curItemType(): ItemTypeEnum | null {
    return this._curItemType;
  }
  set curItemType(newData: ItemTypeEnum) {
    this._curItemType = newData;
    this.renderAndSave();
  }

  get isSelect(): boolean {
    return this._isSelect;
  }
  set isSelect(newData: boolean) {
    this._isSelect = newData;
    this.renderAndSave();
  }

  get mailBoxStatus(): TriggerStatusEnum {
    return this._mailBoxStatus;
  }
  set mailBoxStatus(newData: TriggerStatusEnum) {
    this._mailBoxStatus = newData;
    this.renderAndSave();
  }

  get grandmaStatus(): TriggerStatusEnum {
    return this._grandmaStatus;
  }
  set grandmaStatus(newData: TriggerStatusEnum) {
    this._grandmaStatus = newData;
    this.renderAndSave();
  }

  get grandmaDialogIndex(): number {
    return this._grandmaDialogIndex;
  }
  set grandmaDialogIndex(newData: number) {
    this._grandmaDialogIndex = newData;
    this.renderAndSave();
  }

  get doorStatus(): TriggerStatusEnum {
    return this._doorStatus;
  }
  set doorStatus(newData: TriggerStatusEnum) {
    this._doorStatus = newData;
    this.renderAndSave();
  }

  get H2AData(): Array<number> {
    return this._H2AData;
  }
  set H2AData(newData: Array<number>) {
    this._H2AData = newData;
    this.renderAndSave();
  }

  get curScene(): SceneEnum {
    return this._curScene;
  }
  set curScene(newData: SceneEnum) {
    this._curScene = newData;
    this.renderAndSave();
  }

  renderAndSave() {
    //触发所有渲染方法以及存储相应数据
    EventManager.Instance.emit(EventEnum.Render);

    sys.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      H2AData: this._H2AData,
      curItemType: this._curItemType,
      items: this._items,
      isSelect: this._isSelect,
      mailBoxStatus: this._mailBoxStatus,
      grandmaStatus: this._grandmaStatus,
      grandmaDialogIndex: this._grandmaDialogIndex,
      doorStatus: this._doorStatus,
      curScene: this._curScene
    }));
  }

  restore() {
    //从本地存储中恢复数据
    const _data = sys.localStorage.getItem(STORAGE_KEY);
    try{
      const data = JSON.parse(_data);
      this._H2AData = data.H2AData;
      this._curItemType = data.curItemType;
      this._items = data.items;
      this._isSelect = data.isSelect;
      this._mailBoxStatus = data.mailBoxStatus;
      this._grandmaStatus = data.grandmaStatus;
      this._grandmaDialogIndex = data.grandmaDialogIndex;
      this._doorStatus = data.doorStatus;
      this._curScene = data.curScene;
    }catch (e) {
      this.reset();
    }
  }

  reset() {
    this.H2AData = [...this.H2AInitData];
    this.curItemType = null;
    this.items = [
      { status: ItemStatusEnum.Scene, type: ItemTypeEnum.Key },
      { status: ItemStatusEnum.Disable, type: ItemTypeEnum.Mail }
    ];
    this.isSelect = false;
    this.mailBoxStatus = TriggerStatusEnum.Pengind;
    this.grandmaStatus = TriggerStatusEnum.Pengind;
    this.grandmaDialogIndex = -1;
    this.doorStatus = TriggerStatusEnum.Pengind;
    this.curScene = SceneEnum.H1;
  }
}

// const haha = DataManager.Instance;
// haha.items;
