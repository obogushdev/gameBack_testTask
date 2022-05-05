import { Injectable } from '@nestjs/common';
import { AssetService } from './asset/asset.service';
import { CatalogService } from './catalog/catalog.service';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly catalogService: CatalogService,
    private readonly assetService: AssetService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async initData() {
    await this.userService.initTable();
    await this.catalogService.initTable();
    await this.assetService.initTable();
  }
}
