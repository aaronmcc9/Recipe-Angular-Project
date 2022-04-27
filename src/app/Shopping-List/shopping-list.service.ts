import { EventEmitter } from "@angular/core";
import { Ingredient } from "../Shared/ingredient.model";

export class ShoppingListService{
    
    private ingredients: Ingredient[] = [
        new Ingredient("Duper Sauce", 11),
        new Ingredient("Dads Cupcakes", 11)
      ];

      newIngredient = new EventEmitter<Ingredient[]>();

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.newIngredient.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.newIngredient.emit(ingredients);
    }

    getIngredients(){
        return this.ingredients.slice();
    }
}