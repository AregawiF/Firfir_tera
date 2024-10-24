import { Controller, Param, Body, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import { updateUserDto } from 'src/dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  async getById(@Param('id') userId: string): Promise<User> {
    return this.userService.getById(userId);
  }

  @Patch(':id')
  async updateUser(@Param('id') userId: string, @Body('firstName') firstName: string, @Body('lastName')lastName:string ,@Body('email') email: string) {
    try{
      this.userService.updateById(userId, firstName, lastName, email);
    }
    catch{
      throw new Error('could not update user')
    }
    
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<User> {
    return this.userService.deleteById(userId);
  }
}