import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router' ;
import { FormGroup , FormControl , Validators , FormArray} from '@angular/forms' ;

import { RecipeService } from '../recipe.service' ;

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number ;
  recipeForm: FormGroup ;
  editMode = false ;

  constructor(private route: ActivatedRoute , private recipeService: RecipeService) { }

  ngOnInit() {
    
    this.route.params.subscribe( 
       (params:Params) => {
         this.id = +params['id'] ;
         params['id'] != null ? this.editMode = true : this.editMode = false ; 
         this.formInit();
       }
     );
  }


  private formInit() {

    let name = '' ;
    let imagePath = '';
    let description = '' ;
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipeByIndex(this.id) ;
      name = recipe.name ;
      imagePath = recipe.imagePath ;
      description = recipe.description ;
      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name , Validators.required) ,
              'amount' : new FormControl(ingredient.amount , Validators.required)
            })
           );
        }
      }

    }

     this.recipeForm = new FormGroup({
       'name' :  new FormControl(name , Validators.required) ,
       'imagePath' : new FormControl(imagePath , Validators.required),
       'description' : new FormControl(description , Validators.required),
       'ingredients' : recipeIngredients 
     });
  }



 onSubmit(){
   console.log(this.recipeForm) ;
 }

 addIngredientControl(){
   const control: FormGroup = new FormGroup({
     'name' : new FormControl('' , Validators.required) ,
     'amount' : new FormControl('' , Validators.required)
   }) ;
   (<FormArray>this.recipeForm.get('ingredients')).push(control);
 }

}
