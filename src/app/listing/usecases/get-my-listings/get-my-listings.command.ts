import { IsNumber, IsOptional } from 'class-validator';
import { HostCommand } from '../../../shared/command/host.command';

export class GetListingsCommand extends HostCommand {
  @IsNumber()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  limit: number;
}
