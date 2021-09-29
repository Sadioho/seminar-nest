import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // @Get()
  // findAll() {
  //   return 'Day la users';
  // }

  // @Get(':id')
  // findOne(@Param() params): string {
  //   console.log(params);
  //   return `This action returns a #${params.id} cat`;
  // }

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   try {
  //     return 'this action adds a new user';
  //   } catch (error) {
  //     throw new BadRequestException();
  //   }
  // }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    const user = this.usersService.findById(Number(id));
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      this.usersService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  // @Get()
  // async findAll(): Promise<User[]> {
  //   try {
  //     return this.usersService.findAll();
  //   } catch (error) {
  //     throw new BadRequestException();
  //   }
  // }

  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name: string): User[] {
    const user = this.usersService.findByName(name);
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }
}
