import { Module } from '@nestjs/common';
import { TestingController } from './testing.constroller';

@Module({
  imports: [],
  providers: [],
  controllers: [TestingController],
  exports: [],
})
export class TestingModule {}
