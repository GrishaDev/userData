import { Module } from '@nestjs/common';
import { UserDataController } from './userData.controller';
import { UserDataService } from './userData.service';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { UserData, UserDataSchema } from './userData.schema';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UserDataRepositoryMock } from './userData.repository.mock';
import { UserDataRepository } from './userData.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'userDatas', schema: UserDataSchema }]),
  ],
  controllers: [UserDataController],
  providers: [UserDataService,     {
      provide: 'UserDataRepository',
      useFactory: (configService: ConfigService, userDataModel: Model<UserData>) =>
        configService.get('isMock') ? new UserDataRepositoryMock(configService, userDataModel) : new UserDataRepository(configService, userDataModel),
      inject: [ConfigService, getModelToken('userDatas')],
    },],
})
export class userDataModule {}
