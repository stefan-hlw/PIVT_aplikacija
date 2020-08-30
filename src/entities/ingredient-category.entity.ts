import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ingredients } from "./ingredients.entity";
import * as Validator from 'class-validator';

@Index("uq_ingredient_category_name", ["name"], { unique: true })
@Entity("ingredient_category")
export class IngredientCategory {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "ingredient_category_id",
    unsigned: true,
  })
  ingredientCategoryId: number;

  @Column("varchar", { name: "name", unique: true, length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(5,32)
  name: string;

  @OneToMany(() => Ingredients, (ingredients) => ingredients.ingredientCategory)
  ingredients: Ingredients[];
}
