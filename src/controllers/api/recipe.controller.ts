import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Recipe } from "src/entities/recipe.entity";
import { RecipeService } from "src/services/recipe/recipe.service";

@Controller('api/recipe')
@Crud({
    model: {
        type: Recipe
    },
    params: {
        id: {
            field: 'recipeId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            ingredientCategory: {
                eager: true
            },
            ingredients: {
                eager: true
            }
            
            
        }
    }
})
export class RecipeController {
    constructor(public service: RecipeService) {}
}