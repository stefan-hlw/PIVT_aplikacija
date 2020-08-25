import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { IngredientCategory } from "src/entities/ingredient-category.entity";
import { IngredientCategoryService } from "src/services/ingredient-category/ingredient-category.service";

@Controller('api/ingredientCategory')
@Crud({
    model: {
        type: IngredientCategory
    },
    params: {
        id: {
            field: 'ingredientCategoryId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            ingredientCategory: {
                eager: true
            },
            
            
        }
    }
})
export class IngredientCategoryController {
    constructor(public service: IngredientCategoryService) {}
}