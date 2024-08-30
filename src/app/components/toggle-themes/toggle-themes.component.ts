import {Component, inject} from '@angular/core';

import {AppThemeServiceService} from "../../services/app-theme-service.service";

import {NgOptimizedImage} from "@angular/common";
import {Mode} from "../../types/interfaces/theme-mode";

@Component({
  selector: 'app-toggle-themes',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './toggle-themes.component.html',
  styleUrl: './toggle-themes.component.scss'
})
export class ToggleThemesComponent {

  private readonly appThemeService= inject(AppThemeServiceService)

  public iconSrc!:string
  private readonly currentMode$ = this.appThemeService.currentMode$.subscribe(
      (mode:Mode) => this.setToggleIcon(mode)
  )

  switchTheme():void {
    this.appThemeService.switchTheme()
  }

  private setToggleIcon (mode:Mode):void {
    if(mode === Mode.LIGHT) {
      this.iconSrc = './assets/images/svg/light-mode-icon.svg'
    } else {
      this.iconSrc = './assets/images/svg/dark-mode-icon.svg'
    }
  }
}
