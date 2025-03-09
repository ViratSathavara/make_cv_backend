import { Controller, Get, Param, Delete, Put, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>): Promise<User> {
    return this.usersService.updateUser(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
