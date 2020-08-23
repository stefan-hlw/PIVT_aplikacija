import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_user_email", ["email"], { unique: true })
@Index("uq_user_phone_number", ["phoneNumber"], { unique: true })
@Index("uq_user_forename_surname", ["forename", "surname"], { unique: true })
@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "pass_hash", length: 128 })
  passHash: string;

  @Column("varchar", { name: "forename", length: 64 })
  forename: string;

  @Column("varchar", { name: "surname", length: 64 })
  surname: string;

  @Column("varchar", { name: "phone_number", unique: true, length: 24 })
  phoneNumber: string;
}
