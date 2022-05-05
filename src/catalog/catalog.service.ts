import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Catalog } from './entities/catalog.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog)
    private catalogModel: typeof Catalog,
  ) {}

  async initTable() {
    const anyRow = await this.catalogModel.findOne();
    if (anyRow) {
      return true;
    }

    const usersDto = [
      {
        name: 'building1',
        description: 'building1',
        url: 'url_building1',
        cost1: 100,
        cost2: 100,
        cost3: 100,
        req1: 2,
        req2: 2,
        req3: 2,
        category: 1,
      },
      {
        name: 'building2',
        description: 'building2',
        url: 'url_building2',
        cost1: 200,
        cost2: 200,
        cost3: 200,
        req1: 2,
        req2: 2,
        req3: 2,
        category: 1,
      },
      {
        name: 'building3',
        description: 'building3',
        url: 'url_building3',
        cost1: 300,
        cost2: 300,
        cost3: 300,
        req1: 2,
        req2: 2,
        req3: 2,
        category: 1,
      },
    ];

    const promises = usersDto.map((el) => {
      const newUser = new this.catalogModel(el);
      return newUser.save();
    });

    return await Promise.all(promises);
  }

  async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    const newCatalog = new this.catalogModel(createCatalogDto);
    return newCatalog.save();
  }

  async findAll(): Promise<Catalog[]> {
    return this.catalogModel.findAll();
  }

  async findAllConverted() {
    const allArr = await this.findAll();
    return allArr.map((val) => {
      return this.convertValue(val);
    });
  }

  convertValue(val) {
    return {
      ID: val.ID,
      name: val.name,
      description: val.description,
      url: val.url,
      price: {
        cost1: val.cost1,
        cost2: val.cost2,
        cost3: val.cost3,
      },
      req: {
        req1: val.req1,
        req2: val.req2,
        req3: val.req3,
      },
    };
  }

  async findById(id: number) {
    return this.catalogModel.findByPk(id);
  }

  async update(
    id: number,
    updateCatalogDto: UpdateCatalogDto,
  ): Promise<[affectedCount: number]> {
    return this.catalogModel.update(updateCatalogDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    return user.destroy();
  }
}
