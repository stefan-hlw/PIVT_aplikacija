import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { IngredientCategory } from "src/entities/ingredient-category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class IngredientCategoryService extends TypeOrmCrudService<IngredientCategory> {
    constructor(
        @InjectRepository(IngredientCategory)
        private readonly ingredientCategory: Repository<IngredientCategory> 
     ) {
         super(ingredientCategory);
     }
}