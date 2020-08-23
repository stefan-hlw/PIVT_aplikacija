import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "./recipe.entity";

@Index("uq_category_mage_path", ["imagePath"], { unique: true })
@Index("uq_category_name", ["name"], { unique: true })
@Index("fk_category_parent_category_id", ["parentCategoryId"], {})
@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column("varchar", { name: "image_path", unique: true, length: 128 })
  imagePath: string;

  @Column("varchar", { name: "name", unique: true, length: 32 })
  name: string;

  @Column("int", { name: "parent_category_id", nullable: true, unsigned: true })
  parentCategoryId: number | null;

  @OneToMany(() => Recipe, (recipe) => recipe.category)
  recipes: Recipe[];
}
