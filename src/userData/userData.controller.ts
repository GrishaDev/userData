import { Controller, Get, Post, Param, UseGuards, HttpCode, Body } from '@nestjs/common';
import { UserDataService } from './userData.service';
import { UserData } from './userData.schema';
import { UserDataDTO } from './userData.DTO';

@Controller('api')
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  @Get()
  async getAll(): Promise<UserData[] | []>  {
    try {
      return this.userDataService.getAll();
    } catch(err) {
      console.log(err);
      throw new Error('error');
    }
  }

  @Post()
  @HttpCode(201)
  async insertData(@Body() payload: UserDataDTO): Promise<UserDataDTO>  {
    return this.userDataService.insertData(payload);
  }

}
