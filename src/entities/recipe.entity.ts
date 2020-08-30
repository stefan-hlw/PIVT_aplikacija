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
import { Administrator } from "./administrator.entity";
import { Category } from "./category.entity";
import { RecipeImage } from "./recipe-image.entity";
import { RecipeIngredient } from "./recipe-ingredient.entity";
import { Ingredients } from "./ingredients.entity";
import * as Validator from 'class-validator';

@Index("fk_recipe_category_id", ["categoryId"], {})
@Index("fk_recipe_administrator_id", ["administratorId"], {})
@Entity()
export class Recipe {
  @PrimaryGeneratedColumn({ type: "int", name: "recipe_id", unsigned: true })
  recipeId: number;

  @Column({ type:"varchar",  length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(3, 128)
  name: string;

  @Column({ type:"int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({ type:"int", name: "administrator_id", unsigned: true })
  administratorId: number;

  @Column({type:"timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ type:"tinytext",  name: "instructions" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(16, 10000)
  instructions: string;

  @ManyToOne(() => Administrator, (administrator) => administrator.recipes, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "administrator_id", referencedColumnName: "administratorId" },
  ])
  administrator: Administrator;

  @ManyToOne(() => Category, (category) => category.recipes, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @OneToMany(() => RecipeImage, (recipeImage) => recipeImage.recipe)
  recipeImages: RecipeImage[];

  @OneToMany(() => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe)
  recipeIngredients: RecipeIngredient[];

  @ManyToMany(type => Ingredients, ingredients => ingredients.recipe)
  @JoinTable({
	name: "recipe_ingredient",
	joinColumn: { name: "recipe_id", referencedColumnName: "recipeId" },
	inverseJoinColumn: { name: "ingredient_id", referencedColumnName: "ingredientId" }
  })
  ingredients: Ingredients[];


}
