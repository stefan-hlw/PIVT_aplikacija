import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Ingredients } from "src/entities/ingredients.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import DistinctIngredientsDto from "src/dtos/ingredients/distinct.ingredients.dto";
import { RecipeIngredient } from "src/entities/recipe-ingredient.entity";

@Injectable()
export class IngredientsService extends TypeOrmCrudService<Ingredients> {
    constructor(
        @InjectRepository(Ingredients) private readonly ingredient: Repository<Ingredients>,
        @InjectRepository(RecipeIngredient) private readonly recipeIngredient: Repository<RecipeIngredient> 
     ) {
         super(ingredient);
     }

     async getDistinctByCategoryId(categoryId:number): Promise<DistinctIngredientsDto> {
        const ingredients = await this.ingredient.find({
            categoryId: categoryId,
        });

        const result: DistinctIngredientsDto = {
            ingredients: [],
        };
        if(!ingredients || ingredients.length === 0) {
            return  result;
        }

        result.ingredients = await Promise.all(ingredients.map(async ingredient => {
            const amounts: string[] = 
                (await this.recipeIngredient.createQueryBuilder("ri")
                    .select("DISTINCT ri.amount", 'amount')
                    .where('ri.ingredientId = :ingredientId', { ingredientId: ingredient.ingredientId })
                    .orderBy('ri.amount', 'ASC')
                    .getRawMany()
                    ).map(item => item.amount);
            return {
                ingredientId: ingredient.ingredientId,
                name: ingredient.name,
                amounts: amounts,
            };
        }));

        return result;
     }
}