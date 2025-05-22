import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDataRepository } from './userData.repository';
import { UserData } from './userData.schema';
import { UserDataDTO } from './userData.DTO';

@Injectable()
export class UserDataService {
  constructor(private configService: ConfigService, @Inject('UserDataRepository') private userDataRepository: UserDataRepository) {}
  private readonly logger = new Logger(UserDataService.name);
  
  async getAll(): Promise<UserData[] | []> {
    this.logger.log('getting all data from service');
    return this.userDataRepository.getAll();
  }

  async insertData(payload: UserDataDTO): Promise<UserDataDTO> {
    // extra checks if needed
    this.logger.log('Inserting new entity');
    return this.userDataRepository.insertData(payload);
  }
}
