import { GetMyProfileUsecase } from './usecases/get-my-profile/get-my-profile.usecase';
import { ClassSerializerInterceptor, Controller, Get, Logger, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/framework/auth.guard';
import { ApiResponse } from '../shared/framework/response.decorator';
import { UserResponseDto } from './dtos/user.response.dto';
import { UserSession } from '../shared/framework/user.decorator';
import { IJwtPayload } from '../../shared';
import { GetMyProfileCommand } from './usecases/get-my-profile/get-my-profile.command';
import { ExternalApiAccessible } from '../auth/framework/external-api.decorator';

@Controller('/users')
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
// @ApiExcludeController()
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly getMyProfileUsecase: GetMyProfileUsecase) {}

  @Get('/me')
  @ApiResponse(UserResponseDto)
  @ApiOperation({
    summary: 'Get user',
  })
  // @ExternalApiAccessible()
  async getMyProfile(@UserSession() user: IJwtPayload): Promise<UserResponseDto> {
    Logger.verbose('Getting user profile');
    Logger.debug(`User id: ${user._id}`);
    Logger.verbose('Creating GetMyProfileCommand');

    const command = GetMyProfileCommand.create({
      userId: user._id,
    });

    return await this.getMyProfileUsecase.execute(command);
  }
}
