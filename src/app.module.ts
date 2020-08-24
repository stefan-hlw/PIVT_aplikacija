import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfiguration } from '../config/database.configuration';
import { Administrator } from './entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { Recipe } from './entities/recipe.entity';
import { RecipeImage } from './entities/recipe-image.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { User } from './entities/user.entity';
import { Category } from './entities/category.entity';
import { IngredientCategory } from './entities/ingredient-category.entity';
import { Ingredients } from './entities/ingredients.entity';
import { MeasuringUnit } from './entities/measuring-unit.entity';
import { AdministratorController } from './controllers/api/administrator.controller';

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
        User, 
        Category, 
        IngredientCategory, 
        Ingredients,
        MeasuringUnit ]
    }),
    TypeOrmModule.forFeature([ Administrator, 
      Recipe, 
      RecipeImage, 
      RecipeIngredient, 
      User, 
      Category, 
      IngredientCategory, 
      Ingredients,
      MeasuringUnit])
  ],
  controllers: [AppController,
                AdministratorController],
  providers: [AdministratorService],
})
export class AppModule {}
