import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from 'src/schemas/recipe.schema';
import { CloudinaryModule } from 'src/Upload/cloudinart.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]), CloudinaryModule, JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }), UserModule],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports:[RecipeService]
})
export class RecipeModule { }
