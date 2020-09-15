import { Controller, Get, Param } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import DistinctIngredientsDto from "src/dtos/ingredients/distinct.ingredients.dto";
import { Ingredients } from "src/entities/ingredients.entity";
import { IngredientsService } from "src/services/ingredients/ingredients.service";

@Controller('api/ingredients')      //  http://localhost:3000/api/ingredients/
@Crud({
    model: {
        type: Ingredients
    },
    params: {
        id: {
            field: 'ingredientId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            category: {
                eager: true
            },
            recipeIngredients: {
                eager: false
            },
            recipes: {
                eager: false
            }
            
        }
    },
})
export class IngredientsController {
    constructor(public service: IngredientsService) {}

    @Get('amount/:categoryId')
    async getDistinctByCategoryId(@Param('categoryId') categoryId: number): Promise<DistinctIngredientsDto> {
        return await this.service.getDistinctByCategoryId(categoryId);
    }
}