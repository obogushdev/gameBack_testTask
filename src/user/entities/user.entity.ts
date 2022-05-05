import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Asset } from '../../asset/entities/asset.entity';
import { Product } from '../../product/entities/product.entity';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  address: string;

  @Column({ type: DataType.FLOAT })
  cash1: number;

  @Column({ type: DataType.FLOAT })
  cash2: number;

  @Column({ type: DataType.FLOAT })
  cash3: number;

  @HasMany(() => Asset)
  assets: Asset[];

  @HasMany(() => Product)
  products: Product[];
}
