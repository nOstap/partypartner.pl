import { Controller, Get, Res, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { homedir } from 'os';
import { Response } from 'express';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(301)
  index(@Res() res: Response) {
    res.redirect(301, process.env.URL);
  }
}
