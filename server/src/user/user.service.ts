import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { emitWarning } from 'process';
import { first, last } from 'rxjs';
import { updateUserDto } from 'src/dto/update-user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) { }

  async getById(userId: string) {

    let user;
    try {
      user = await this.userModel.findById(userId).exec();
    }
    catch {
      throw new NotFoundException('Could not find user')
    }
    if (!user) {
      throw new NotFoundException('Could not find user')
    }
    return user
  }

  async updateById(userId: string, firstName: string, lastName: string, email: string ) {
    let updated ;
    try{
        updated = await this.userModel.findById(userId).exec();
    }
    catch{
        throw new NotFoundException('could not find reicpe')
    }

    if (firstName){
        updated.firstName = firstName   
    }
    if (lastName){
        updated.lastName= lastName
    }
    if (email){
        updated.email = email

    }
    updated.save();
  }

  async deleteById(id: string): Promise<User> {
    const deletedAccount = await this.userModel.findByIdAndDelete(id).lean();

    if (!deletedAccount) {
      throw new NotFoundException('User not found!');
    }

    return deletedAccount as User;
  }
}
