import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  collapsed = true;
  isRecipes: string;

//  @Output() viewChanged = new EventEmitter<string>();

  // onViewChange(selectedView: HTMLAnchorElement) {
  //   this.isRecipes = selectedView.text;
  //   this.viewChanged.emit(this.isRecipes);
  // }
}
