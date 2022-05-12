import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../Shared/ingredient.model";
import { ShoppingListService } from "../Shopping-List/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService) { }

    private recipes: Recipe[] = [
        new Recipe('A test recipe',
            'very good',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
            [
                new Ingredient('Meat', 2),
                new Ingredient('Fries', 5)
            ]),
        new Recipe('Another one test recipe',
            'why not?',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
            [
                new Ingredient('Mup Magic', 4),
                new Ingredient('Alistairs Areolli', 5)
            ])
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number){
        return this.recipes[id];
        // return Object.keys(this.recipes[id]);

    }

    onAddIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes);
    }

    updateRecipe(id:number, recipe: Recipe){
        this.recipes[id] = recipe;
        this.recipesChanged.next(this.recipes);
    }

    deleteRecipe(id:number){
        this.recipes.splice(id,1);
        this.recipesChanged.next(this.recipes);
    }
}