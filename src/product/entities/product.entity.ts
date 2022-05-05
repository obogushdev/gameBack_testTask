import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table
export class Product extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ field: 'address' })
  address: string;
}
