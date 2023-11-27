import { IsNumber, IsOptional } from 'class-validator';

import { BaseCommand } from '../../../shared/command/base.command';

export class GetAllListingsCommand extends BaseCommand {
  @IsNumber()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  limit: number;
}
