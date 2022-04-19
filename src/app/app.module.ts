import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes/recipes-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './Shopping-List/shopping-list.component';
import { ShoppingEditComponent } from './Shopping-List/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './Shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,  
    RecipesComponent,
    RecipesListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }