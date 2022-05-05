import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AssetService } from 'src/asset/asset.service';
import { Asset } from 'src/asset/entities/asset.entity';
import { CatalogService } from 'src/catalog/catalog.service';
import { Catalog } from 'src/catalog/entities/catalog.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    private sequelize: Sequelize,
    private readonly userService: UserService,
    private readonly assetService: AssetService,
    private readonly catalogService: CatalogService,

    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async initTable() {
    return true;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newRow = new this.productModel(createProductDto);
    return newRow.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async findById(id: number): Promise<Product> {
    return this.productModel.findByPk(id);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<[affectedCount: number]> {
    return this.productModel.update(updateProductDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const row = await this.findById(id);
    return row.destroy();
  }

  getCashReqErrors(user: User, catalogProd: Catalog) {
    const cashErrors = [];

    if (user.cash1 < catalogProd.cost1) {
      cashErrors.push({
        cash: 'cash1',
        diff: user.cash1 - catalogProd.cost1,
      });
    }
    if (user.cash2 < catalogProd.cost2) {
      cashErrors.push({
        cash: 'cash2',
        diff: user.cash2 - catalogProd.cost2,
      });
    }
    if (user.cash3 < catalogProd.cost3) {
      cashErrors.push({
        cash: 'cash3',
        diff: user.cash3 - catalogProd.cost3,
      });
    }

    return cashErrors;
  }

  getAssetsReqErrors(catalogProd: Catalog, assets: Asset[]) {
    const reqErrors = [];
    if (
      catalogProd.req1 &&
      !assets.find((el) => {
        return el.type === 1;
      })
    ) {
      reqErrors.push({ type: 1, req: catalogProd.req1 });
    }
    if (
      catalogProd.req1 &&
      !assets.find((el) => {
        return el.type === 2;
      })
    ) {
      reqErrors.push({ type: 2, req: catalogProd.req2 });
    }
    if (
      catalogProd.req1 &&
      !assets.find((el) => {
        return el.type === 3;
      })
    ) {
      reqErrors.push({ type: 3, req: catalogProd.req3 });
    }
    return reqErrors;
  }

  async byProduct(productId: number, userAddress: string) {
    try {
      const user = await this.userService.findById(userAddress);
      if (!user) {
        return {
          success: false,
          error: {
            errorMessage: 'User not found',
          },
        };
      }

      const catalogProd = await this.catalogService.findById(productId);
      if (!catalogProd) {
        return {
          success: false,
          error: {
            errorMessage: 'Catalog element not found',
          },
        };
      }

      const cashErrors = this.getCashReqErrors(user, catalogProd);

      const assets = await this.assetService.findByAddressGteReq(
        userAddress,
        catalogProd.req1,
        catalogProd.req2,
        catalogProd.req3,
      );
      const reqErrors = this.getAssetsReqErrors(catalogProd, assets);

      let errMess = '';
      if (cashErrors.length) {
        errMess +=
          'Not enough cash (' +
          cashErrors
            .map((el) => {
              return `${el.cash}: ${el.diff}`;
            })
            .join(';') +
          ' )';
      }
      if (reqErrors.length) {
        errMess +=
          'Build assets (' +
          reqErrors
            .map((el) => {
              return `type ${el.type} for lvl ${el.req} `;
            })
            .join(';') +
          ')';
      }

      if (errMess.length) {
        return {
          success: false,
          error: {
            errorMessage: errMess,
          },
        };
      }

      user.cash1 -= catalogProd.cost1;
      user.cash2 -= catalogProd.cost2;
      user.cash3 -= catalogProd.cost3;

      try {
        await this.sequelize.transaction(async (t) => {
          const transactionHost = { transaction: t };

          await user.save(transactionHost);
          await this.productModel.create(
            {
              address: user.address,
            },
            transactionHost,
          );
        });
      } catch (err) {
        console.error('error', err);
        return {
          success: false,
          error: {
            errorMessage: 'Transaction error!',
          },
        };
      }

      return {
        success: true,
        data: {
          resources: {
            cash1: user.cash1,
            cash2: user.cash2,
            cash3: user.cash3,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          errorMessage: error.message,
        },
      };
    }
  }
}
