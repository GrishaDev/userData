import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserData } from './userData.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDataDTO } from './userData.DTO';

@Injectable()
export class UserDataRepository {
  constructor(private configService: ConfigService, @InjectModel('userDatas') private userDataModel: Model<UserData>) {}
  private readonly logger = new Logger(UserDataRepository.name);

  async getAll(): Promise<UserData[] | []> {
    this.logger.log(`getting all user data entities`);
    const data = await this.userDataModel.find();
    if (!data?.length) {
      return []
    };

    return data;
  }

  async insertData(dataDto: UserDataDTO, age: number | null): Promise<UserDataDTO> {
      this.logger.log(`creating new userData entity`);
      const user = new this.userDataModel({...dataDto, age});
      await user.save();
      return dataDto;
  }
  
}
