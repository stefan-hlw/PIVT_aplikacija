import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Recipe } from "src/entities/recipe.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddRecipeDto } from "src/dtos/recipe/add.recipe.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { RecipeIngredient } from "src/entities/recipe-ingredient.entity";

@Injectable()
export class RecipeService extends TypeOrmCrudService<Recipe> {
    constructor(
        @InjectRepository(Recipe)
        private readonly recipe: Repository<Recipe>,

        @InjectRepository(RecipeIngredient)
        private readonly recipeIngredient: Repository<RecipeIngredient>
     ) {
         super(recipe);
     }

    async createFullRecipe(data: AddRecipeDto): Promise<Recipe | ApiResponse> {
         let newRecipe: Recipe = new Recipe();
         newRecipe.name = data.name;
         newRecipe.categoryId = data.categoryId;
         newRecipe.administratorId = data.administratorId;
         newRecipe.instructions = data.instructions;

         let savedRecipe = await this.recipe.save(newRecipe)

         for (let ingredient of data.ingredients) {
             let newRecipeIngredient: RecipeIngredient = new RecipeIngredient();
             newRecipeIngredient.recipeId = savedRecipe.recipeId;
             newRecipeIngredient.ingredientId = ingredient.ingredientId;
             newRecipeIngredient.amount = ingredient.amount;

             await this.recipeIngredient.save(newRecipeIngredient);   
         }
         return await this.recipe.findOne(savedRecipe.recipeId, {
             relations: [
                 // might need more work(?)
                 "category",
                 "ingredients",
                 "recipeImages"
             ]
         })
     }

}