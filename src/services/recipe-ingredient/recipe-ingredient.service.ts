import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { RecipeIngredient } from "src/entities/recipe-ingredient.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RecipeIngredientService extends TypeOrmCrudService<RecipeIngredient> {
    constructor(
        @InjectRepository(RecipeIngredient)
        private readonly recipeIngredient: Repository<RecipeIngredient> 
     ) {
         super(recipeIngredient);
     }
}