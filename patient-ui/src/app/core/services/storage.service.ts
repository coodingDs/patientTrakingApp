import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  tokenInfo:any;
  constructor() { }

  Set(key: string, value: any): any {
    window.localStorage[key] = JSON.stringify(value);
    return true;
  }

  Get(key: string): any {
    let value = window.localStorage[key];
    if (value) {
      return JSON.parse(window.localStorage[key]);
    } else null;
  }

  Remove(key: string): any {
    window.localStorage.removeItem(key);
  }

  Clear(): void {
    window.localStorage.clear();
  }
}
 