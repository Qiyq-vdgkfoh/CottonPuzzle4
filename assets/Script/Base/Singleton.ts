

//单例基类
export default class Singleton {

  private static _instance: Singleton = null;

  static GetInstance<T>(): T {
    //这是一个普通方法，而不是get修饰的方法，子类中获得单例是通过调用而不是重写这个方法
    if (this._instance === null) {
      this._instance = new this();
    }

    return this._instance as T;
  }
}
