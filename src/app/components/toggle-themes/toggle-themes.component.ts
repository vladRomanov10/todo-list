import {Component, inject} from '@angular/core';

import {AppThemeServiceService} from "../../services/app-theme-service.service";

import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {Mode} from "../../types/interfaces/theme-mode";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-toggle-themes',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './toggle-themes.component.html',
  styleUrl: './toggle-themes.component.scss'
})
export class ToggleThemesComponent {

  private readonly appThemeService= inject(AppThemeServiceService)

  readonly currentMode$:BehaviorSubject<Mode> = this.appThemeService.currentMode$

  switchTheme():void {
    this.appThemeService.switchTheme()
  }
}
