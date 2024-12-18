import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

@Schema({ timestamps: true })
export class User {

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: [true, 'Duplicate email'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'viewer' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
