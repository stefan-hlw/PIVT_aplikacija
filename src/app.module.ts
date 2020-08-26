import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfiguration } from '../config/database.configuration';
import { Administrator } from './entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { Recipe } from './entities/recipe.entity';
import { RecipeImage } from './entities/recipe-image.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { Category } from './entities/category.entity';
import { IngredientCategory } from './entities/ingredient-category.entity';
import { Ingredients } from './entities/ingredients.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { CategoryService } from './services/category/category.service';
import { CategoryController } from './controllers/api/category.controller';
import { IngredientsService } from './services/ingredients/ingredients.service';
import { IngredientsController } from './controllers/api/ingredients.controller';
import { RecipeService } from './services/recipe/recipe.service';
import { RecipeController } from './controllers/api/recipe.controller';
import { IngredientCategoryService } from './services/ingredient-category/ingredient-category.service';
import { IngredientCategoryController } from './controllers/api/ingredient-category.controller';
import { RecipeImageService } from './services/recipe-image/recipe-image.service';
import { RecipeImageController } from './controllers/api/recipe-image-controller';
import { RecipeIngredientService } from './services/recipe-ingredient/recipe-ingredient.service';
import { RecipeIngredientController } from './controllers/api/recipe-ingredient.service';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';




DatabaseConfiguration

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [ Administrator,
        Recipe, 
        RecipeImage, 
        RecipeIngredient, 
        Category, 
        IngredientCategory, 
        Ingredients,
         ]
    }),
    TypeOrmModule.forFeature([ Administrator, 
      Recipe, 
      RecipeImage, 
      RecipeIngredient, 
      Category, 
      IngredientCategory, 
      Ingredients,
      ])
  ],
  controllers: [AppController,
                AdministratorController,
                CategoryController,
                IngredientsController,
                RecipeController,
                IngredientCategoryController,
                RecipeImageController,
                RecipeIngredientController,
                AuthController],
  providers: [AdministratorService,
              CategoryService,
              IngredientsService,
              RecipeService,
              IngredientCategoryService,
              RecipeImageService,
              RecipeIngredientService],
              exports: [
                AdministratorService,
              ]
})
  
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/*')
      .forRoutes('/api/*');
  }

}
