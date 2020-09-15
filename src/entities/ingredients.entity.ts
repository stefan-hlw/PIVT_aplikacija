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
import { RecipeIngredient } from "./recipe-ingredient.entity";
import { Recipe } from "./recipe.entity";
import * as Validator from 'class-validator';
import { Category } from "./category.entity";

@Index("fk_article_category_id", ["categoryId"], {})
@Index("uq_ingredients_category_id_name", ["name", "categoryId"], { unique: true })
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

  @Column({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

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

  @ManyToOne(
    () => Category,
    category => category.ingredients,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )

  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;
}
