import { Controller, Get, Post, HttpCode, Body } from '@nestjs/common';
import { UserDataService } from './userData.service';
import { UserData } from './userData.schema';
import { UserDataDTO } from './userData.DTO';

@Controller('api')
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  @Get()
  async getAll(): Promise<UserData[] | []>  {
    return this.userDataService.getAll();
  }

  @Post()
  @HttpCode(201)
  async insertData(@Body() payload: UserDataDTO): Promise<UserDataDTO>  {
    return this.userDataService.insertData(payload);
  }

}
