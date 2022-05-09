import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  editMode = false;
  subscription : Subscription;
  editableItemIndex : number;
  editingItem: Ingredient;

  createRecipeForm: FormGroup;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {

    this.subscription = this.shoppingListService.itemIndex.subscribe(
      (idx: number) => {
        this.editMode = true;
        this.editableItemIndex = idx;

        this.editingItem = this.shoppingListService.getIngredientById(idx);
        this.createRecipeForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        });
      }
    )

    this.createRecipeForm = new FormGroup({
      name : new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required])
    });
  }

  onSubmitIngredient() {
    console.log(this.createRecipeForm);
    
    this.editMode ?
    this.shoppingListService.updateIngredient(this.editableItemIndex, new Ingredient(this.createRecipeForm.value.name, this.createRecipeForm.value.amount))
    : this.shoppingListService.addIngredient(new Ingredient(this.createRecipeForm.value.name, this.createRecipeForm.value.amount));
    this.onClear();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editableItemIndex);
    this.onClear();
  }

  onClear(){
    this.createRecipeForm.reset();
    this.editMode = false
  }
}
