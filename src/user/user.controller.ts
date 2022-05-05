import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':address')
  findDyAddress(@Param('address') address: string) {
    return this.userService.findById(address);
  }

  @Patch(':address')
  update(
    @Param('address') address: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(address, updateUserDto);
  }

  @Delete(':address')
  remove(@Param('address') address: string) {
    return this.userService.remove(address);
  }
}
