import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {Mode} from "../types/interfaces/theme-mode";

@Injectable({
  providedIn: 'root'
})
export class AppThemeServiceService {
  private readonly localStorageService:LocalStorageService = inject(LocalStorageService)

  public iconSrc:string = ''

  public currentMode: Mode = Mode.LIGHT

  constructor() {
    this.setMode()
  }

  switchTheme() {
    if (this.currentMode === Mode.LIGHT) {
      this.updateCurrentMode(Mode.DARK)
    } else {
      this.updateCurrentMode(Mode.LIGHT)
    }
    this.localStorageService.updateLS(this.localStorageService.themeModeLSKey, this.currentMode)
  }

  private setMode():void {
    const deviceMode:MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
    let userMode:Mode | null = this.localStorageService.getDataFromLS(this.localStorageService.themeModeLSKey)
    if (!userMode) {
      deviceMode.matches ? (userMode = Mode.DARK) : (userMode = Mode.LIGHT)
    }
    this.updateCurrentMode(userMode)
  }

  private updateCurrentMode(theme: Mode):void {
    document.body.classList.remove(this.currentMode)
    this.currentMode = theme
    document.body.classList.add(this.currentMode)
    this.setToggleIcon()
  }

  private setToggleIcon ():void {
    if(this.currentMode === Mode.LIGHT) {
      this.iconSrc = './assets/images/svg/light-mode-icon.svg'
    } else {
      this.iconSrc = './assets/images/svg/dark-mode-icon.svg'
    }
  }
}