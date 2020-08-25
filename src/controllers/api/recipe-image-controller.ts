import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { RecipeImage } from "src/entities/recipe-image.entity";
import { RecipeImageService } from "src/services/recipe-image/recipe-image.service";

@Controller('api/recipeimg')
@Crud({
    model: {
        type: RecipeImage
    },
    params: {
        id: {
            field: 'imgId',
            type: 'number',
            primary: true
        }
    },
   
    }
)
export class RecipeImageController {
    constructor(public service: RecipeImageService) {}
}