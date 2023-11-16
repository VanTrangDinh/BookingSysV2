import { EnvironmentRepository } from './../../../../dal/repositories/environment/environment.repository';
import { Injectable } from '@nestjs/common';
import { CreateEnvironmentCommand } from './create-environment.command';
import { nanoid } from 'nanoid';
import * as uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { GenerateUniqueApiKey } from '../generate-unique-api-key/generate-unique-api-key.usecase';

@Injectable()
export class CreateEnvironment {
  constructor(
    private readonly environmentRepository: EnvironmentRepository,
    private readonly generateUniqueApiKey: GenerateUniqueApiKey,
  ) {}
  async execute(command: CreateEnvironmentCommand) {
    const key = await this.generateUniqueApiKey.execute();

    const environment = await this.environmentRepository.create({
      _organizationId: command.organizationId,
      name: command.name,
      identifier: uuidv4(),
      _parentId: command.parentEnvironmentId,
      apiKeys: [
        {
          key,
          _userId: command.userId,
        },
      ],
    });

    // if(!command.parentEnvironmentId) {
    //   await
    // }

    return environment;
  }
}
