import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Administrator } from "./administrator.entity";
import { Category } from "./category.entity";
import { RecipeImage } from "./recipeImage.entity";
import { RecipeIngredient } from "./recipeIngredient.entity";

@Index("fk_recipe_category_id", ["categoryId"], {})
@Index("fk_recipe_administrator_id", ["administratorId"], {})
@Entity("recipe")
export class Recipe {
  @PrimaryGeneratedColumn({ type: "int", name: "recipe_id", unsigned: true })
  recipeId: number;

  @Column("varchar", { name: "name", length: 128 })
  name: string;

  @Column("int", { name: "category_id", unsigned: true })
  categoryId: number;

  @Column("int", { name: "administrator_id", unsigned: true })
  administratorId: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("tinytext", { name: "instructions" })
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

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe
  )
  recipeIngredients: RecipeIngredient[];
}
