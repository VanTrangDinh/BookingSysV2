import { OrganizationRepository } from '../../../../dal';
import { Injectable } from '@nestjs/common';
import { GetOrganizationCommand } from './get-organization.command';

@Injectable()
export class GetOrganization {
  constructor(private readonly organizationRepository: OrganizationRepository) {}

  async execute(command: GetOrganizationCommand) {
    return this.organizationRepository.findById(command.id);
  }
}
