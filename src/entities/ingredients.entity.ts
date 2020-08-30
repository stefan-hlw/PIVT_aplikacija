import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { IngredientCategory } from "./ingredient-category.entity";
import { RecipeIngredient } from "./recipe-ingredient.entity";
import { Recipe } from "./recipe.entity";
import * as Validator from 'class-validator';

@Index("uq_ingredients_name", ["name"], { unique: true })
@Index("fk_igredients_ingredient_category_id", ["ingredientCategoryId"], {})
@Entity()
export class Ingredients {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "ingredient_id",
    unsigned: true,
  })
  ingredientId: number;

  @Column("varchar", { name: "name", unique: true, length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(3, 32)
  name: string;

  @Column("int", { name: "ingredient_category_id", unsigned: true })
  ingredientCategoryId: number;

  @ManyToOne(
    () => IngredientCategory,
    (ingredientCategory) => ingredientCategory.ingredients,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    {
      name: "ingredient_category_id",
      referencedColumnName: "ingredientCategoryId",
    },
  ])
  ingredientCategory: IngredientCategory;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.ingredient
  )
  recipeIngredients: RecipeIngredient[];


  @ManyToMany(type => Recipe, recipe => recipe.ingredients)
  @JoinTable({
	name: "ingredient_recipe",
	joinColumn: { name: "ingredient_id", referencedColumnName: "ingredientId" },
	inverseJoinColumn: { name: "recipe_id", referencedColumnName: "recipeId" }
  })
  recipe: Recipe[];
}
