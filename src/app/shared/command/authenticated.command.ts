import { IsNotEmpty } from 'class-validator';
import { BaseCommand } from './base.command';
import { Optional } from '@nestjs/common';

export abstract class AuthenticatedCommand extends BaseCommand {
  @IsNotEmpty()
  public readonly userId: string;

  @Optional()
  public readonly roles?: string[];
}
