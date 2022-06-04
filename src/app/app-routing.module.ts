import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './auth/auth/auth.guard';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeResolverService } from './recipes/recipes-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './Shopping-List/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', 
    component: RecipesComponent, 
    resolve: [RecipeResolverService],
    canActivate: [AuthGuard], 
    children: [
      { path: '', component: RecipeStartComponent},
      { path: 'new', component: RecipeEditComponent }, //put before id or else will fail (expects id if other way around)
      { path: ':id', 
      component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ]
  },
  {
    path: 'shopping-list', component: ShoppingListComponent
  },
  {
    path: 'auth', component: AuthComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
