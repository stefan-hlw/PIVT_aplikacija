import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Ingredients } from "src/entities/ingredients.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class IngredientsService extends TypeOrmCrudService<Ingredients> {
    constructor(
        @InjectRepository(Ingredients)
        private readonly ingredients: Repository<Ingredients> 
     ) {
         super(ingredients);
     }
}