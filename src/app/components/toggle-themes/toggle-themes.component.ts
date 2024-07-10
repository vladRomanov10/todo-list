import {Component, inject, Inject} from '@angular/core';
import {Mode} from "../../types/interfaces/theme-mode";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-toggle-themes',
  standalone: true,
  imports: [],
  templateUrl: './toggle-themes.component.html',
  styleUrl: './toggle-themes.component.scss'
})
export class ToggleThemesComponent {

  private readonly localStorageService:LocalStorageService = inject(LocalStorageService)

  private currentMode: Mode = Mode.LIGHT

  ngOnInit() {
    document.body.classList.add(this.currentMode)
  }

  toggleMode():void {
    if (this.currentMode === Mode.LIGHT) {
      this.updateCurrentMode(Mode.DARK)
    } else {
      this.updateCurrentMode(Mode.LIGHT)
    }
  }

  private updateCurrentMode(theme: Mode):void {
    document.body.classList.remove(this.currentMode)
    this.currentMode = theme
    document.body.classList.add(this.currentMode)

  }
}
