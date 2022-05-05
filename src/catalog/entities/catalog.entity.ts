import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Catalog extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  ID: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  url: string;

  @Column({ type: DataType.INTEGER })
  cost1: number;

  @Column({ type: DataType.INTEGER })
  cost2: number;

  @Column({ type: DataType.INTEGER })
  cost3: number;

  @Column({ type: DataType.INTEGER })
  req1: number;

  @Column({ type: DataType.INTEGER })
  req2: number;

  @Column({ type: DataType.INTEGER })
  req3: number;

  @Column({ type: DataType.INTEGER })
  category: number;
}
