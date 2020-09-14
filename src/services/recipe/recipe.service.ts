import { Injectable, Post } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Recipe } from "src/entities/recipe.entity";
import { Repository, Any, In } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddRecipeDto } from "src/dtos/recipe/add.recipe.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { RecipeIngredient } from "src/entities/recipe-ingredient.entity";
import { EditRecipeDto } from "src/dtos/recipe/edit.recipe.dto";
import { RecipeSearchDto } from "src/dtos/recipe/recipe.search.dto";

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

         let savedRecipe = await this.recipe.save(newRecipe);

         for (let ingredient of data.ingredients) {
             let newRecipeIngredient: RecipeIngredient = new RecipeIngredient();
             newRecipeIngredient.recipeId = savedRecipe.recipeId;
             newRecipeIngredient.ingredientId = ingredient.ingredientId;
             newRecipeIngredient.amount = ingredient.amount;

             await this.recipeIngredient.save(newRecipeIngredient);   
         }
         return await this.recipe.findOne(savedRecipe.recipeId, {
             relations: [
                 "category",
                 "recipeIngredients",
                 "recipeImages"
             ]
         });
     }
     // Recipe edit
     async editFullRecipe(recipeId:number, data: EditRecipeDto) : Promise<Recipe | ApiResponse> {
         const existingRecipe: Recipe = await this.recipe.findOne(recipeId, {
             relations: ['recipeIngredients']
         });

         if(!existingRecipe) {
             return new ApiResponse('error', -5001, 'Recipe not found');
         }
         existingRecipe.name = data.name;
         existingRecipe.categoryId = data.categoryId;
         existingRecipe.instructions = data.instructions;

         const savedRecipe = await this.recipe.save(existingRecipe);
         if(!savedRecipe) {
             return new ApiResponse('error', -5002, 'Could not save new recipe data.');
         }

        if (data.ingredients !== null) {
            await this.recipeIngredient.remove(existingRecipe.recipeIngredients);

            for (let ingredient of data.ingredients) {
                let newRecipeIngredient: RecipeIngredient = new RecipeIngredient();
                newRecipeIngredient.recipeId = recipeId;
                newRecipeIngredient.ingredientId = ingredient.ingredientId;
                newRecipeIngredient.amount = ingredient.amount;
   
                await this.recipeIngredient.save(newRecipeIngredient);   
                return await this.recipe.findOne(recipeId, {
                    relations: [
                        "category",
                        "recipeIngredients",
                        "recipeImages"
                    ]
                });
            }
        }

     }
     
     async search(data: RecipeSearchDto): Promise<Recipe[] | ApiResponse> {
         const builder = await this.recipe.createQueryBuilder('recipe');

         builder.leftJoin("recipe.recipeIngredients", "ri");

         builder.where(`recipe.categoryId = :catId`, { catId: data.categoryId});

         if(data.keywords && data.keywords.length > 0) {
             builder.andWhere(`(recipe.name LIKE :kw OR recipe.instructions LIKE :kw)`, { kw: '%' + data.keywords.trim() + '%'});
         }

         if (data.ingredients && data.ingredients.length>0) {
             for (const ingredient of data.ingredients) {
                 builder.andWhere('ri.ingredientId = :rId AND ri.amount IN (:riAmo)',
                         {  
                             rId: ingredient.ingredientId,
                             riAmo: ingredient.amount,
                         });
             }
         }

         let orderBy = 'recipe.name';
         let orderDirection: 'ASC' | 'DESC' = 'ASC';

         if (data.orderBy) {
             orderBy = data.orderBy;
         }
         if (data.orderDirection) {
             orderDirection = data.orderDirection;
         }
         builder.orderBy(orderBy, orderDirection);

         let page = 0;
         let perPage: 5 | 10 | 25 = 25;

         if (data.page && typeof data.page === 'number') {
             page = data.page;
         }

         if (data.page && typeof data.itemsPerPage === 'number') {
             perPage = data.itemsPerPage;
         }
         
         builder.skip(page * perPage);
         builder.take(perPage);

         let recipeIds = await  (await builder.getMany()).map(recipe => recipe.recipeId);

         if (recipeIds.length === 0) {
            return new ApiResponse("ok", 0, "No recipes found")
         }

         return await this.recipe.find({
             where: { recipeId: In(recipeIds) },
             relations: [
                "category",
                "ingredients",
                "recipeIngredients",
                "recipeImages"
             ]
         });
    }
}
