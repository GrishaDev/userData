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
  
    // Can be in seperate module with more development time
    const agifyHost = this.configService.get('agifyHost');
    const { firstName } = payload;
    let age = null;

    try {
      this.logger.log('Calling agify API');
      const res = await fetch(`${agifyHost}?name=${firstName}`, { method: 'GET' });
      if (res.ok) {
        this.logger.log('Agify api request success');
        const data = await res.json();
        age = data?.age;
      }
    } catch (err) {
      this.logger.warn(`Agify api request has failed, will continue anyway`);
    }

    this.logger.log('Inserting new entity');
    return this.userDataRepository.insertData(payload, age);
  }
}
