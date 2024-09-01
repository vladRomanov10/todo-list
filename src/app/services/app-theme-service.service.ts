import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {Mode} from "../types/interfaces/theme-mode";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppThemeServiceService {
  private readonly localStorageService:LocalStorageService = inject(LocalStorageService)

  public currentMode$!:BehaviorSubject<Mode>

  constructor() {
    this.setMode()
  }

  switchTheme() {
    if (this.currentMode$.getValue() === Mode.LIGHT) {
      this.updateCurrentMode(Mode.DARK)
    } else {
      this.updateCurrentMode(Mode.LIGHT)
    }
    this.localStorageService.updateLS(this.localStorageService.themeModeLSKey, this.currentMode$.getValue())
  }

  private setMode():void {
    let userMode:Mode | null = this.localStorageService.getDataFromLS(this.localStorageService.themeModeLSKey)
    if (!userMode) {
      const deviceMode:MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
      deviceMode.matches ? (userMode = Mode.DARK) : (userMode = Mode.LIGHT)
    }
    this.currentMode$ = new BehaviorSubject<Mode>(userMode)
    this.updateCurrentMode(userMode)
  }

  private updateCurrentMode(theme: Mode):void {
    document.body.classList.remove(this.currentMode$.getValue())
    this.currentMode$.next(theme)
    document.body.classList.add(this.currentMode$.getValue())
  }
}