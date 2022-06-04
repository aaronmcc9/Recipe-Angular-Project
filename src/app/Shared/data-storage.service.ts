import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService,
        private authService: AuthService) { }

    storeData() {
        const recipes = this.recipeService.getRecipes();

        this.http.put('https://recipe-app-f9480-default-rtdb.firebaseio.com/recipes.json',
            recipes)
            .subscribe((responseData) => {
                console.log(responseData);
            })
    }

    //once take executes that observable will unsubscribe
    //exhaust map is a separate obserble that waits for take to complete and uses its returned data once ot does
    //this gives us the token id to authorize the user making the request
    fetchData() {
        return this.http.get<Recipe[]>('https://recipe-app-f9480-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                }));
    }
}