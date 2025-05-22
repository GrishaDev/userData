import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserData } from './userData.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDataDTO } from './userData.DTO';
import * as crypto from 'crypto';

@Injectable()
export class UserDataRepositoryMock {
  constructor(private configService: ConfigService, @InjectModel('userDatas') private userDataModel: Model<UserData>) {}
  private readonly logger = new Logger(UserDataRepositoryMock.name);
  
  private entities: UserData[] = [];

  async getAll(): Promise<UserData[] | []> {
    this.logger.log('[Mock] getting all data from repo');
    return this.entities;
  }

  async insertData(dataDto: UserDataDTO): Promise<UserDataDTO> {
    this.logger.log(`[Mock] creating new userData entity`);
    const randomId = crypto.randomBytes(16).toString('hex');
    const newEntity = {...dataDto, id: randomId};
    this.entities.push(newEntity);
    return dataDto;
  }
}
