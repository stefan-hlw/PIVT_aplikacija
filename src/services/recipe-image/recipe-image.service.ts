import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { RecipeImage } from "src/entities/recipe-image.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RecipeImageService extends TypeOrmCrudService<RecipeImage> {
    constructor(
        @InjectRepository(RecipeImage)
        private readonly recipeImage: Repository<RecipeImage> 
     ) {
         super(recipeImage);
     }
}