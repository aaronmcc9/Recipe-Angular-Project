import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  collapsed = true;
  isRecipes: string;

 @Output() viewChanged = new EventEmitter<string>();

  onViewChange(selectedView: HTMLAnchorElement) {
    this.isRecipes = selectedView.text;
    this.viewChanged.emit(this.isRecipes);
  }
}
