import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table
export class Asset extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 1,
      max: 3,
    },
  })
  type: number;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 1,
      max: 10,
    },
  })
  level: number;

  @ForeignKey(() => User)
  @Column({ field: 'address' })
  address: string;
}
