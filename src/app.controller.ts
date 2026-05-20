import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Inject('USER_SERVICE')
  private readonly userClient: ClientProxy;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sum')
  sum(@Query('num') num: string) {
    const numArr = num.split(',').map(Number);
    return this.userClient.send('sum', numArr);
  }
}
