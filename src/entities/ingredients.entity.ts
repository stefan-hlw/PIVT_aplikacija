import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IngredientCategory } from "./ingredient-category.entity";
import { RecipeIngredient } from "./recipe-ingredient.entity";

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
}
