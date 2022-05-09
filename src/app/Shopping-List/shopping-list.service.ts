import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../Shared/ingredient.model";

export class ShoppingListService{

    itemIndex = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient("Duper Sauce", 11),
        new Ingredient("Dads Cupcakes", 11)
      ];

      ingredientChanged = new EventEmitter<Ingredient[]>();

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    updateIngredient(id: number, ingredient : Ingredient){
        this.ingredients[id] = ingredient;
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.emit(ingredients);
    }

    getIngredientById(id: number){
        return this.ingredients[id];
    }

    getIngredients(){
        return this.ingredients.slice();
    }

    deleteIngredient(id:number){
        this.ingredients.splice(id, 1);
        this.ingredientChanged.emit(this.ingredients.slice());
    }
}