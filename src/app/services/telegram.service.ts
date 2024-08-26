import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';

interface TgButton {
  show():void;
  hide():void;
  setText(text: string):void;
  onClick(fn: Function): void;
  offClick(fn: Function): void;

  }
  
@Injectable({
  providedIn: 'root'
})

export class TelegramService {
  private window;
  tg;
  constructor(@Inject(DOCUMENT) private _document) { 
    this.window = this._document.defaultView;
    
    this.tg = this.window.Telegram.WebApp;
    
    
  
  }
  get MainButton ():TgButton {
    return this.tg.MainButton;
  }
  get BackButton ():TgButton {
    return this.tg.BackButton;
  }
  get Ready() {
    return this.tg.ready();
  }
  get UserId(): string | null {
    // initDataUnsafe содержит информацию о пользователе
    const initDataUnsafe = this.tg.initDataUnsafe;
    return initDataUnsafe && initDataUnsafe.user ? initDataUnsafe.user.id : "1234567";
    //return "123456";
  }
  get RefId(): string | null {
    const ref = this.tg.initDataUnsafe.start_param;
    return ref;
  }
  get UserName(): string | null {
    // initDataUnsafe содержит информацию о пользователе
    const initDataUnsafe = this.tg.initDataUnsafe;
    return initDataUnsafe && initDataUnsafe.user ? initDataUnsafe.user.first_name : null;
    //return "ПопущенецПо";
  }
  get Device(): string | null {
    // initDataUnsafe содержит информацию о пользователе
    const platform = this.tg.platform;
    return platform;
  }

}
