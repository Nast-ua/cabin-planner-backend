import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll({ limit, offset }: PaginationQueryDto) {
    return this.usersRepository.find({
      relations: { reservations: true },
      skip: offset,
      take: limit,
    });
  }

  async findById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { reservations: true },
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.usersRepository.save(existingUser);
  }

  async remove(id: string) {
    const user = await this.findById(id);

    return this.usersRepository.remove(user);
  }
}
