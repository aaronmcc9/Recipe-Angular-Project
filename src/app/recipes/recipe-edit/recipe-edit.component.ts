import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import * as _ from "lodash";
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  editRecipeForm: FormGroup;
  selectedRecipe: Recipe;
  editedRecipe: Recipe;
  changesMade = false;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.editMode = params['id'] != null;
          this.id = params['id'];

          this.initForm();
        }
      )
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.selectedRecipe = this.recipeService.getRecipe(this.id)

      recipeName = this.selectedRecipe.name;
      recipeImagePath = this.selectedRecipe.imagePath;
      recipeDescription = this.selectedRecipe.description;

      if (this.selectedRecipe['ingredients']) {

        for (let ingredient of this.selectedRecipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, [Validators.required]),
            amount: new FormControl(ingredient.amount, [Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
    }


    this.editRecipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      ingredients: recipeIngredients
    });

    this.editRecipeForm.valueChanges.subscribe(
      (recipe: Recipe) => {

        if (this.editMode) {
          this.editedRecipe = recipe;
          this.changesMade = (this.editedRecipe.name !== this.selectedRecipe.name
            || this.editedRecipe.description !== this.selectedRecipe.description
            || this.editedRecipe.imagePath !== this.selectedRecipe.imagePath
            || JSON.stringify(this.editedRecipe.ingredients) !== JSON.stringify(this.selectedRecipe.ingredients));
        }
        else{
          this.changesMade = true;
        }
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.editRecipeForm.value)
    }
    else {
      this.recipeService.addRecipe(this.editRecipeForm.value)
    }

    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onCancel() {
    if (this.editMode) {

      this.editRecipeForm.patchValue({
        name: this.selectedRecipe.name,
        imagePath: this.selectedRecipe.imagePath,
        description: this.selectedRecipe.description,
      });
    }
    else {
      this.editRecipeForm.reset();
    }
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.editRecipeForm.get('ingredients')).removeAt(index);
  }

  onAddNewIngredient() {
    (<FormArray>this.editRecipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null,
        [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
    }))
  }

  get controls() { // a getter!
    return (<FormArray>this.editRecipeForm.get('ingredients')).controls;
  }
}
