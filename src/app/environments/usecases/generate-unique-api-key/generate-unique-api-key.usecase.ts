import { EnvironmentRepository } from './../../../../dal/repositories/environment/environment.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
const hat = require('hat');

const API_KEY_GENERATION_MAX_RETRIES = 3;

@Injectable()
export class GenerateUniqueApiKey {
  constructor(private readonly environmentRepository: EnvironmentRepository) {}
  async execute(): Promise<string> {
    let apiKey = '';
    let count = 0;
    let isApiKeyUsed = true;
    while (isApiKeyUsed) {
      apiKey = this.generateApiKey();
      const environment = await this.environmentRepository.findByApiKey(apiKey);
      isApiKeyUsed = environment ? true : false;
      count += 1;

      if (count === API_KEY_GENERATION_MAX_RETRIES) {
        const errorMessage = 'Clashing of the API key generation';
        throw new InternalServerErrorException(new Error(errorMessage), errorMessage);
      }
    }

    return apiKey as string;
  }

  private generateApiKey(): string {
    return hat();
  }
}
