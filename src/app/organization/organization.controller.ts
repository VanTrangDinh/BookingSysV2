import { ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/organizations')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Organizations')
export class OrganizationController {
  constructor() {}
}
