
import { _decorator, Component, Node } from 'cc';
import { ItemManager } from './ItemManager';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
const { ccclass, property } = _decorator;


@ccclass('KeyManager')
export class KeyManager extends ItemManager {

    label = "信箱钥匙";
    type: ItemTypeEnum = ItemTypeEnum.Key;
}
