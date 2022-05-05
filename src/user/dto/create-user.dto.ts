import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  /**
   * user address
   * @example User1
   */
  @ApiProperty({ example: 'User1', description: 'User address' })
  @IsNotEmpty()
  @IsString()
  address: string;

  /**
   * amount of cash type 1
   * @example 1
   */
  @ApiProperty({ example: 100, description: 'amount of cash type 1' })
  @IsNotEmpty()
  @IsNumber()
  cash1: number;

  /**
   * amount of cash type 2
   * @example 100
   */
  @ApiProperty({ example: 100, description: 'amount of cash type 2' })
  @IsNotEmpty()
  @IsNumber()
  cash2: number;

  /**
   * amount of cash type 3
   * @example 100
   */
  @ApiProperty({ example: 100, description: 'amount of cash type 3' })
  @IsNotEmpty()
  @IsNumber()
  cash3: number;
}
