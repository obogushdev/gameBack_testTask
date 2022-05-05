import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async initTable() {
    const anyRow = await this.userModel.findOne();
    if (anyRow) {
      return true;
    }

    const usersDto = [
      { address: 'user1', cash1: 100, cash2: 100, cash3: 100 },
      { address: 'user2', cash1: 500, cash2: 500, cash3: 500 },
      { address: 'user3', cash1: 1000, cash2: 1000, cash3: 1000 },
    ];

    const promises = usersDto.map((el) => {
      const newUser = new this.userModel(el);
      return newUser.save();
    });

    return Promise.all(promises);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findById(address: string): Promise<User> {
    return this.userModel.findByPk(address);
  }

  async update(
    address: string,
    updateUserDto: UpdateUserDto,
  ): Promise<[affectedCount: number]> {
    return this.userModel.update(updateUserDto, {
      where: {
        address,
      },
    });
  }

  async remove(address: string): Promise<void> {
    const user = await this.findById(address);
    return user.destroy();
  }
}
