import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { RecipeIngredient } from "src/entities/recipe-ingredient.entity";
import { RecipeIngredientService } from "src/services/recipe-ingredient/recipe-ingredient.service";

@Controller('api/recipeingredient')
@Crud({
    model: {
        type: RecipeIngredient
    },
    params: {
        id: {
            field: 'recipeIngredientId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            ingredients: {
                eager: true
            },
        }
    }
    }
)
export class RecipeIngredientController {
    constructor(public service: RecipeIngredientService) {}
}