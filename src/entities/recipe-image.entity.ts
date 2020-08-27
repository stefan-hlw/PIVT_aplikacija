import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "./recipe.entity";

@Index("uq_recipe_image_image_path", ["imagePath"], { unique: true })
@Index("fk_recipe_image_recipe_id", ["recipeId"], {})
@Entity("recipe_image")
export class RecipeImage {
  @PrimaryGeneratedColumn({ type: "int", name: "img_id", unsigned: true })
  imgId: number;

  @Column("int", { name: "recipe_id", unsigned: true })
  recipeId: number;

  @Column("varchar", { name: "image_path", unique: true, length: 128 })
  imagePath: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeImages, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  
  @JoinColumn([{ name: "recipe_id", referencedColumnName: "recipeId" }])
  recipe: Recipe;
}
