import * as Validator from 'class-validator';
import { RecipeSearchIngredientDto } from './recipe.search.ingredient.dto';

export class RecipeSearchDto {
    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.Length(0, 128)
    keywords: string;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0,
    })
    categoryId: number;

   ingredients: RecipeSearchIngredientDto[]; 
  

    @Validator.IsOptional()
    @Validator.IsIn(['name'])
    orderBy: 'name';

    @Validator.IsOptional()
    @Validator.IsIn(['ASC', 'DESC'])
    orderDirection: 'ASC' | 'DESC';
    
    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0,
    })
    page: number;

    @Validator.IsOptional()
    @Validator.IsIn([5, 10, 25])
    itemsPerPage: 5 | 10 | 25;
}