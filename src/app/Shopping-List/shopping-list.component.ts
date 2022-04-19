import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../Shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

 ingredients: Ingredient[] = [
   new Ingredient("Duper Sauce", 11),
   new Ingredient("Dads Cupcakes", 11)
 ];

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(){
    console.log("wowmanseep");
  }
}
