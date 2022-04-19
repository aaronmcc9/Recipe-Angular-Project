import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  @Output() passItemToRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A test recipe','very good', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'),
    new Recipe('Another one test recipe','why not?', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505')
  ];

  constructor() {}

  ngOnInit(): void {}

  onNewRecipeToList(newRecipe: Recipe){
    console.log("snoo[ps", newRecipe);
    this.passItemToRecipe.emit(newRecipe)
  }
}
