import { GetOrganizationCommand } from './../get-organization/get-organization.command';
import { Injectable } from '@nestjs/common';
import { CreateOrganizationCommand } from './create-organization.command';
import { OrganizationEntity, UserRepository, OrganizationRepository } from '../../../../dal';
import { ApiException } from '../../../shared/exceptions/api.exception';
import { GetOrganization } from '../get-organization/get-organization.usecase';
import { CreateEnvironment } from '../../../environments/usecases/create-environment/create-environment.usecase';
import { CreateEnvironmentCommand } from '../../../environments/usecases/create-environment/create-environment.command';

@Injectable()
export class CreateOrganization {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly getOrganizationUsecase: GetOrganization,
    private readonly createEnvironmentUsecase: CreateEnvironment,
  ) {}

  async execute(command: CreateOrganizationCommand): Promise<OrganizationEntity> {
    const user = await this.userRepository.findById(command.userId);
    if (!user) throw new ApiException('User not found');

    const createdOrganization = await this.organizationRepository.create({
      name: command.name,
      logo: command.logo,
      // apiServiceLevel: ApiServiceLevelTypeEnum.FREE,
    });

    //create devEnv

    const devEnv = await this.createEnvironmentUsecase.execute(
      CreateEnvironmentCommand.create({
        userId: user._id,
        name: 'Development',
        organizationId: createdOrganization._id,
      }),
    );

    const organizationAfterChanges = await this.getOrganizationUsecase.execute(
      GetOrganizationCommand.create({
        id: createdOrganization._id,
        userId: command.userId,
      }),
    );

    return organizationAfterChanges as OrganizationEntity;
  }
}
