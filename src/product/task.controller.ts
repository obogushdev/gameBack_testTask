import { Body, Controller, Post } from '@nestjs/common';
import { BuyProductDto } from 'src/product/dto/buyProduct.dto';
import { ProductService } from 'src/product/product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller()
export class TaskController {
  constructor(private readonly productService: ProductService) {}

  @Post('byProduct')
  byProduct(@Body() buyProductDto: BuyProductDto) {
    return this.productService.byProduct(
      buyProductDto.id,
      buyProductDto.address,
    );
  }
}
