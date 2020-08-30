import * as Validator from 'class-validator';

export class RecipeIngredientComponentDto {
    ingredientId: number;

    @Validator.IsNotEmpty()
    @Validator.Length(1,255)
    amount: string; 
}