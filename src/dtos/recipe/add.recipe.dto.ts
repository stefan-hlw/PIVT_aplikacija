import * as Validator from 'class-validator';
import { RecipeIngredientComponentDto } from './recipe.ingredient.component.dto';
import { IsArray, ValidateNested } from 'class-validator';

export class AddRecipeDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(3, 128)
    name: string;

    categoryId: number;

    administratorId: number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 30000)
    instructions: string;

    @Validator.IsArray()
    @Validator.ValidateNested({
        always: true,
    })
    ingredients: RecipeIngredientComponentDto[];

}