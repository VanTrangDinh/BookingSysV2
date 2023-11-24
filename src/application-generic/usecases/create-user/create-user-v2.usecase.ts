// import { Injectable } from '@nestjs/common';
// // import { UserEntity, UserRepository } from '../../../dal';
// import { CreateUserCommand } from './create-user.command';
// import { UserRepository } from '../../../dal/infra/repositories';
// import { UserEntity, UserTokenExternalEntity } from '../../../dal/infra/entities';

// @Injectable()
// export class CreateUser {
//   constructor(
//     private readonly userRepository: UserRepository,
//     private readonly userTokenExternalEntity: UserTokenExternalEntity,
//   ) {}

//   async execute(data: CreateUserCommand): Promise<UserEntity> {
//     const user = new UserEntity();

//     user.email = data.email ? data.email.toLowerCase() : undefined;
//     user.firstName = data.firstName ? data.firstName.toLowerCase() : undefined;
//     user.lastName = data.lastName ? data.lastName.toLowerCase() : undefined;

//     const token = new UserTokenExternalEntity();

//     // user.tokens = [
//     //   {
//     //     username: data.auth.username,
//     //     providerId: data.auth.profileId,
//     //     provider: data.auth.provider,
//     //     accessToken: data.auth.accessToken,
//     //     refreshToken: data.auth.refreshToken,
//     //     valid: true,
//     //   },
//     // ];

//     return await this.userRepository.create(user);
//   }
// }
