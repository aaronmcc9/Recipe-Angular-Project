import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentView = 'Recipes'

  setCurrentComponent(newView: string)
  {
    this.currentView = newView;
    console.log("hey", this.currentView);
  }
}
