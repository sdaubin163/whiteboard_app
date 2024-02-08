import { kMaxLength } from 'node:buffer'

export class MainContentViewPosition {
  private _x: number = 0;
  private _y: number = 0;
  private _width : number = 0;
  private _height : number = 0;

  set(x:number, y:number, width:number, height:number) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  get x(): number {
    return this._x
  }

  set x(value: number) {
    this._x = value
  }

  get y(): number {
    return this._y
  }

  set y(value: number) {
    this._y = value
  }

  get width(): number {
    return this._width
  }

  set width(value: number) {
    this._width = value
  }

  get height(): number {
    return this._height
  }

  set height(value: number) {
    this._height = value
  }
}