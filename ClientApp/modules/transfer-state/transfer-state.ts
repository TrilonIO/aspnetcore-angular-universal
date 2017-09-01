import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

@Injectable()
export class TransferState {
  private _map = new Map<string, any>();

  constructor() { }

  keys() {
    return this._map.keys();
  }

  get(key: string): any {
    const cachedValue = this._map.get(key);
    this._map.delete(key);
    return cachedValue;
  }

  set(key: string, value: any): Map<string, any> {
    return this._map.set(key, value);
  }

  toJson(): any {
    const obj = {};
    Array.from(this.keys())
      .forEach(key => {
        obj[key] = this.get(key);
      });
    return obj;
  }

  initialize(obj: any): void {
    Object.keys(obj)
      .forEach(key => {
        this.set(key, obj[key]);
      });
  }

  inject(): void { }
}
