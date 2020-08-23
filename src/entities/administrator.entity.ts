import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "./recipe.entity";

@Index("uq_administrator_username", ["username"], { unique: true })
@Entity()
export class Administrator {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "administrator_id",
    unsigned: true,
  })
  administratorId: number;

  @Column({ type: "varchar", unique: true, length: 32 })
  username: string;

  @Column("varchar", { name: "password_hash", length: 128 })
  passwordHash: string;

  @OneToMany(() => Recipe, (recipe) => recipe.administrator)
  recipes: Recipe[];
}
