import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogDto {
  /**
   * Product name
   * @example TestProduct
   */
  @ApiProperty({ example: '12', description: 'Product name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Product description
   * @example 'Some description'
   */
  @ApiProperty({ example: 'Some description', description: 'Product description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * Product url
   * @example 'http://any.url'
   */
  @ApiProperty({ example: 'http://any.url', description: 'Product url' })
  @IsNotEmpty()
  @IsString()
  url: string;

  /**
   * Required amount of cash1
   * @example 100
   */
  @ApiProperty({ example: 100, description: 'Required amount of cash1' })
  @IsNotEmpty()
  @IsNumber()
  cost1: number;

  /**
   * Required amount of cash2
   * @example 100
   */
  @ApiProperty({ example: 100, description: 'Required amount of cash2' })
  @IsNotEmpty()
  @IsNumber()
  cost2: number;

  /**
   * Required amount of cash3
   * @example 100
   */
  @ApiProperty({ example: 100, description: 'Required amount of cash3' })
  @IsNotEmpty()
  @IsNumber()
  cost3: number;

  /**
   * Required level of asset type 1, range 1 - 10
   * @example 5
   */
  @ApiProperty({ example: 5, description: 'Required level of asset type 1' })
  @IsNotEmpty()
  @IsNumber()
  req1: number;

  /**
   * Required level of asset type 2, range 1 - 10
   * @example 5
   */
  @ApiProperty({ example: 5, description: 'Required level of asset type 2' })
  @IsNotEmpty()
  @IsNumber()
  req2: number;

  /**
   * Required level of asset type 3, range 1 - 10
   * @example 5
   */
  @ApiProperty({ example: 5, description: 'Required level of asset type 3' })
  @IsNotEmpty()
  @IsNumber()
  req3: number;

  /**
   * Product category
   * @example 5
   */
  @ApiProperty({ example: 4, description: 'Product category' })
  @IsNotEmpty()
  @IsNumber()
  category: number;
}
