import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Catalog } from './entities/catalog.entity';

@Module({
  imports: [SequelizeModule.forFeature([Catalog])],
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
