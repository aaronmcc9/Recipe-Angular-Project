import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor() { }

 recipesSelected: [];
 selectedRecipe: Recipe;

  ngOnInit(): void {
  }

  onNewRecipeSelected(newSelection: Recipe){
    console.log("wowmanstop", newSelection);
  }

}
