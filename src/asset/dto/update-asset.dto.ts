import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAssetDto {
  /**
   * asset owner address
   * @example User1
   */
  @ApiProperty({ example: 'User1', description: 'The address of asset owner' })
  @IsNotEmpty()
  @IsString()
  address: string;

  /**
   * asset type
   * @example 1
   */
  @ApiProperty({ example: 1, description: 'Asset type, range 1 to 3' })
  @IsNotEmpty()
  @IsNumber()
  type: number;

  /**
   * asset level
   * @example 1
   */
  @ApiProperty({ example: 1, description: 'Asset level, range 1 to 10' })
  @IsNotEmpty()
  @IsNumber()
  level: number;
}
