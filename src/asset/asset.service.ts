import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel(Asset)
    private assetModel: typeof Asset,
  ) {}

  async initTable() {
    const anyRow = await this.assetModel.findOne();
    if (anyRow) {
      return true;
    }

    const assetsDto = [
      { address: 'user1', type: 1, level: 5 },
      { address: 'user1', type: 2, level: 5 },
      { address: 'user1', type: 3, level: 5 },

      { address: 'user2', type: 1, level: 7 },
      { address: 'user2', type: 2, level: 7 },
    ];

    const promises = assetsDto.map((el) => {
      const newAsset = new this.assetModel(el);
      return newAsset.save();
    });

    return Promise.all(promises);
  }

  async create(createAssetDto: CreateAssetDto): Promise<Asset> {
    const newAsset = new this.assetModel(createAssetDto);
    return newAsset.save();
  }

  async findAll(): Promise<Asset[]> {
    return this.assetModel.findAll();
  }

  async findById(id: number): Promise<Asset> {
    return this.assetModel.findByPk(id);
  }

  async findByAddress(address: string): Promise<Asset[]> {
    return this.assetModel.findAll({
      where: {
        address,
      },
    });
  }

  async update(
    id: number,
    updateAssetDto: UpdateAssetDto,
  ): Promise<[affectedCount: number]> {
    return await this.assetModel.update(updateAssetDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const asset = await this.assetModel.findOne({
      where: {
        id,
      },
    });
    return asset.destroy();
  }

  async findByAddressGteReq(
    userAddress: string,
    req1: number,
    req2: number,
    req3: number,
  ): Promise<Asset[]> {
    return this.assetModel.findAll({
      where: {
        [Op.and]: [
          { address: userAddress },
          {
            [Op.or]: [
              {
                [Op.and]: [{ type: 1 }, { level: { [Op.gte]: req1 } }],
              },
              {
                [Op.and]: [{ type: 2 }, { level: { [Op.gte]: req2 } }],
              },
              {
                [Op.and]: [{ type: 3 }, { level: { [Op.gte]: req3 } }],
              },
            ],
          },
        ],
      },
    });
  }
}
