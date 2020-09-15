import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Recipe } from "./recipe.entity";
import * as Validator from 'class-validator';
import { Ingredients } from "./ingredients.entity";

@Index("fk_category_parent_category_id", ["parentCategoryId"], {})
@Index("uq_category_mage_path", ["imagePath"], { unique: true })
@Index("uq_category_name", ["name"], { unique: true })
@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column("varchar", { name: "image_path", unique: true, length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(1,128)
  imagePath: string;

  @Column("varchar", { name: "name", unique: true, length: 32 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(5,32)
  name: string;

  @Column("int", { name: "parent_category_id", nullable: true, unsigned: true })
  parentCategoryId: number | null;

  @OneToMany(() => Recipe, (recipe) => recipe.category)
  recipes: Recipe[];

  @ManyToOne(() => Category, (category) => category.categories, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "parent_category_id", referencedColumnName: "categoryId" },
  ])
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Category[];

  @OneToMany(
    () => Ingredients,
    ingredient => ingredient.category
  )
  ingredients: Ingredients[];
}


