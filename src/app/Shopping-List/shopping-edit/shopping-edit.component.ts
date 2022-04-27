import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

@ViewChild('nameInput', {static: true}) nameInput: ElementRef;
@ViewChild('amountInput', {static: true}) amountInput: ElementRef;

  onCreateIngredient(e: Event){
    e.stopPropagation();

    if(this.nameInput.nativeElement.value === '' || this.amountInput.nativeElement.value === '')
      return false;

      this.shoppingListService.addIngredient(new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value))

    this.nameInput.nativeElement = "";
    this.amountInput.nativeElement = "";
    }

}
