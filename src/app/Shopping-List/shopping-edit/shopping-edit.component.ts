import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

@Output() newIngredient = new EventEmitter<Ingredient>();

constructor() { }

  ngOnInit(): void {
  }

@ViewChild('nameInput', {static: true}) nameInput: ElementRef;
@ViewChild('amountInput', {static: true}) amountInput: ElementRef;

  onCreateIngredient(e: Event){
    e.stopPropagation();

    if(this.nameInput.nativeElement.value === '' || this.amountInput.nativeElement.value === '')
      return false;

    this.newIngredient.emit(new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));

    this.nameInput.nativeElement = "";
    this.amountInput.nativeElement = "";
    }

}
