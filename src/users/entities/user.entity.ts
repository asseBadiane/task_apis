import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Table,
  Column,
  DataType,
  BeforeCreate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Table({ tableName: 'users' })
export class User extends Model {
  @ApiProperty({
    type: Number,
    required: false,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nom: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  prenom: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email?: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Exclude()
  password: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  photo?: string;

  @BeforeCreate
  static async hashPassword(instance: User) {
    const saltRounds = 10;
    instance.password = await bcrypt.hash(instance.password, saltRounds);
  }
}
