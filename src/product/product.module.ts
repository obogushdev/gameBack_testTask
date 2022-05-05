import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

import { Asset } from '../asset/entities/asset.entity';
import { AssetModule } from 'src/asset/asset.module';
import { AssetService } from '../asset/asset.service';

import { Catalog } from '../catalog/entities/catalog.entity';
import { CatalogModule } from '../catalog/catalog.module';
import { CatalogService } from '../catalog/catalog.service';
import { TaskController } from './task.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Catalog, User, Asset]),
    UserModule,
    CatalogModule,
    AssetModule,
  ],
  controllers: [ProductController, TaskController],
  providers: [ProductService, UserService, AssetService, CatalogService],
})
export class ProductModule {}
