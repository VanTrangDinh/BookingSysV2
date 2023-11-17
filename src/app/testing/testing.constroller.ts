import { Body, Controller, Get, HttpException, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { IdempotencyBodyDto } from './dtos/idempotency.dto';
import { ApiExcludeController } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/framework/auth.guard';
import { ExternalApiAccessible } from '../auth/framework/external-api.decorator';

@Controller('/testing')
@ApiExcludeController()
export class TestingController {
  constructor() {}

  @ExternalApiAccessible()
  @UseGuards(JwtAuthGuard)
  @Post('/idempotency')
  async idempotency(@Body() body: IdempotencyBodyDto): Promise<{ number: number }> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();

    if (body.data > 300) {
      throw new HttpException(`` + Math.random(), body.data);
    }
    if (body.data === 250) {
      //for testing conflict
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return { number: Math.random() };
  }

  @Get('/idempotency')
  async idempotencyGet(): Promise<{ number: number }> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();

    return { number: Math.random() };
  }
}
