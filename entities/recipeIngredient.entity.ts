import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ingredients } from "./ingredients.entity";
import { MeasuringUnit } from "./measuringUnit.entity";
import { Recipe } from "./recipe.entity";

@Index("fk_recipe_ingredient_recipe_id", ["recipeId"], {})
@Index("fk_recipe_ingredient_munit_id", ["munitId"], {})
@Index("fk_recipe_ingredient_ingredient_id", ["ingredientId"], {})
@Entity("recipe_ingredient")
export class RecipeIngredient {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "recipe_ingredient_id",
    unsigned: true,
  })
  recipeIngredientId: number;

  @Column("int", { name: "recipe_id", unsigned: true })
  recipeId: number;

  @Column("int", { name: "munit_id", unsigned: true })
  munitId: number;

  @Column("int", { name: "ingredient_id", unsigned: true })
  ingredientId: number;

  @Column("int", { name: "amount", unsigned: true })
  amount: number;

  @ManyToOne(
    () => Ingredients,
    (ingredients) => ingredients.recipeIngredients,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "ingredient_id", referencedColumnName: "ingredientId" }])
  ingredient: Ingredients;

  @ManyToOne(
    () => MeasuringUnit,
    (measuringUnit) => measuringUnit.recipeIngredients,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "munit_id", referencedColumnName: "munitId" }])
  munit: MeasuringUnit;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "recipe_id", referencedColumnName: "recipeId" }])
  recipe: Recipe;
}
