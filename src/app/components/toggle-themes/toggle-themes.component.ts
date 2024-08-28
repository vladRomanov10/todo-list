import {Component, inject} from '@angular/core';

import {AppThemeServiceService} from "../../services/app-theme-service.service";

import {NgOptimizedImage} from "@angular/common";

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

  public iconSrc:string = './assets/images/svg/light-mode-icon.svg'

  switchTheme():void {
    this.appThemeService.switchTheme()
  }
}
