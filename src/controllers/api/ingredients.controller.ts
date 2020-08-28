import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
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
            ingredientCategory: {
                eager: true
            },
            
            
        }
    }
})
export class IngredientsController {
    constructor(public service: IngredientsService) {}
}