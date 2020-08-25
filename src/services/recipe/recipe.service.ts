import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Recipe } from "src/entities/recipe.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RecipeService extends TypeOrmCrudService<Recipe> {
    constructor(
        @InjectRepository(Recipe)
        private readonly recipe: Repository<Recipe> 
     ) {
         super(recipe);
     }
}