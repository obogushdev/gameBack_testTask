import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BuyProductDto {
  /**
   * catalog id
   * @example 1
   */
  @ApiProperty({ example: '12', description: 'catalog id of desired product' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  /**
   * product owner address
   * @example User1
   */
  @ApiProperty({ example: 'User1', description: 'The address of asset owner' })
  @IsNotEmpty()
  @IsString()
  address: string;
}
