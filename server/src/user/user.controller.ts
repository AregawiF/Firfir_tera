import { Controller, Param, Body, Delete, Get, Patch, UseGuards, UnauthorizedException, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import { updateUserDto } from 'src/dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';


@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService, private jwtService: JwtService,
) { }

  @Get()
  async getById(@Request() req): Promise<User> {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const decoded = this.jwtService.verify(token); 
    const userId = decoded.id; 
    return this.userService.getById(userId);
  }


  @Patch()
  async updateUser(@Request() req, @Body('firstName') firstName: string, @Body('lastName')lastName:string ,@Body('email') email: string) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const decoded = this.jwtService.verify(token); // Decode the token
    const userId = decoded.id; 
    try{
      this.userService.updateById(userId, firstName, lastName, email);
    }
    catch{
      throw new Error('could not update user')
    } 
  }

  @Delete()
  async deleteUser(@Request() req): Promise<User> {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const decoded = this.jwtService.verify(token); // Decode the token
    const userId = decoded.id; 

    return this.userService.deleteById(userId);
  }
}