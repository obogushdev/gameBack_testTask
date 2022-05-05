import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  /**
   * Product owner address (User address)
   * @example 1
   */
  @ApiProperty({
    example: 'User1',
    description: 'Product owner address (User address)',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
