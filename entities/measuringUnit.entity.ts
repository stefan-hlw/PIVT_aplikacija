import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RecipeIngredient } from "./recipeIngredient.entity";

@Index("uq_measuring_unit_name", ["name"], { unique: true })
@Entity("measuring_unit")
export class MeasuringUnit {
  @PrimaryGeneratedColumn({ type: "int", name: "munit_id", unsigned: true })
  munitId: number;

  @Column("varchar", { name: "name", unique: true, length: 128 })
  name: string;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.munit
  )
  recipeIngredients: RecipeIngredient[];
}
