import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ingredients } from "./ingredients.entity";
import { Recipe } from "./recipe.entity";

@Index("fk_recipe_ingredient_recipe_id", ["recipeId"], {})
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


  @Column("int", { name: "ingredient_id", unsigned: true })
  ingredientId: number;

  @Column("varchar", { name: "amount", length: 255 })
  amount: string;

  @ManyToOne(
    () => Ingredients,
    (ingredients) => ingredients.recipeIngredients,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "ingredient_id", referencedColumnName: "ingredientId" }])
  ingredient: Ingredients;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "recipe_id", referencedColumnName: "recipeId" }])
  recipe: Recipe;
}
