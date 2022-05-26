import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    
    constructor(private http:HttpClient, private recipeService: RecipeService){}

    storeData(){
        const recipes = this.recipeService.getRecipes();
        
        this.http.put('https://recipe-app-f9480-default-rtdb.firebaseio.com/recipes.json',
        recipes)
        .subscribe((responseData) => {
            console.log(responseData);
        })
    }

    fetchData(){
        return this.http.get<Recipe[]>('https://recipe-app-f9480-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }),
        tap(recipes =>{
            this.recipeService.setRecipes(recipes); 
        }));
    }
}