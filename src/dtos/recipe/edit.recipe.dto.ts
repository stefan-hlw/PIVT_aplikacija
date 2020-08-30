import * as Validator from 'class-validator';
import { RecipeIngredientComponentDto } from './recipe.ingredient.component.dto';

export class EditRecipeDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(3, 128)
    name: string;

    categoryId: number;
    
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(16, 10000)
    instructions: string;

    @Validator.IsOptional()
    @Validator.IsArray()
    @Validator.ValidateNested({
        always: true,
    })
    ingredients: RecipeIngredientComponentDto[] | null;
}