import { ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/environments')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Environments')
export class EnvironmentsController {
  constructor() {}
}
