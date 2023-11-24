import { PasswordResetRequest } from './usecases/password-reset-request/password-reset-request.usecase';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiExcludeController,
  ApiOperation,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
// import { UserRegister } from './usecases/register/user-register.usecase';
import { UserRegistrationBodyDto } from './dtos/user-register.dto';
import { UserRegisterCommand } from './usecases/register/user-register.command';
import { LoginBodyDto } from './dtos/login.dto';
import { Login } from './usecases/login/login.usecase';
import { LoginCommand } from './usecases/login/login.command';
import { ApiException } from '../shared/exceptions/api.exception';
import { AuthService, buildOauthRedirectUrl } from '../../application-generic';
import { JwtAuthGuard } from './framework/auth.guard';
import { ApiResponse } from '../shared/framework/response.decorator';
import { PasswordResetRequestCommand } from './usecases/password-reset-request/password-reset-request.command';
import { PasswordResetBodyDto } from './dtos/password-reset.dto';
import { PasswordReset } from './usecases/password-reset/password-reset.usecase';
import { PasswordResetCommand } from './usecases/password-reset/password-reset.command';
import { IJwtPayload } from '../../shared/entities/user';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenResponseDto } from './dtos/refreshToken.response.dto';
import { UserResponseDto } from '../user/dtos/user.response.dto';
import { UserSession } from '../shared/framework/user.decorator';
import { IdempotencyInterceptor } from '../shared/framework/idempotency.interceptor';
// import { UserRegister } from './usecases/register/user-register-v2.usecase';
import { UserRegister } from './usecases/register/user-register.usecase';

@Controller('/auth')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Auth')
// @ApiExcludeController()
@UseInterceptors(IdempotencyInterceptor)
export class AuthController {
  constructor(
    private userRegisterUsecase: UserRegister,
    private loginUsecase: Login,
    private readonly passwordResetRequest: PasswordResetRequest,
    private readonly passwordReset: PasswordReset,
    private authService: AuthService,
  ) {}
  //neu don gian thi de frontend giai quyet logout, con phuc tap hon thi backend se viet api logout

  @Get('/refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse(RefreshTokenResponseDto)
  refreshToken(@UserSession() user: IJwtPayload) {
    if (!user || !user._id) throw new BadRequestException();
    return this.authService.refreshToken(user._id);
  }

  @Post('/reset/request')
  async forgotPasswordRequest(@Body() body: { email: string }) {
    return await this.passwordResetRequest.execute(
      PasswordResetRequestCommand.create({
        email: body.email,
      }),
    );
  }

  @Post('/reset')
  async passWordReset(@Body() body: PasswordResetBodyDto) {
    return this.passwordReset.execute(
      PasswordResetCommand.create({
        password: body.password,
        token: body.token,
      }),
    );
  }

  @Get('/facebook')
  facebookAuth() {
    Logger.verbose('Checking Facebook Auth');

    if (!process.env.FACEBOOK_OAUTH_CLIENT_ID || !process.env.FACEBOOK_OAUTH_CLIENT_SECRET) {
      throw new ApiException(
        'Facebook auth is not configured, please provide FACEBOOK_OAUTH_CLIENT_ID and FACEBOOK_OAUTH_CLIENT_SECRET as env variables',
      );
    }

    Logger.verbose('Facebook Auth has all variables');

    return {
      success: true,
    };
  }

  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(@Req() request, @Res() response) {
    const url = buildOauthRedirectUrl(request);
    return response.redirect(url);
  }

  @Get('/google')
  googleAuth() {
    Logger.verbose('Checking Google Auth');

    if (!process.env.GOOGLE_OAUTH_CLIENT_ID || !process.env.GOOGLE_OAUTH_CLIENT_SECRET) {
      throw new ApiException(
        'Google auth is not configured, please provide GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET as env variables',
      );
    }

    Logger.verbose('Google Auth has all variables');

    return {
      success: true,
    };
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() request, @Res() response) {
    const url = buildOauthRedirectUrl(request);
    return response.redirect(url);
  }

  @Get('/github')
  githubAuth() {
    Logger.verbose('Checking Github Auth');

    if (!process.env.GITHUB_OAUTH_CLIENT_ID || !process.env.GITHUB_OAUTH_CLIENT_SECRET) {
      throw new ApiException(
        'GitHub auth is not configured, please provide GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET as env variables',
      );
    }

    Logger.verbose('Github Auth has all variables.');

    return {
      success: true,
    };
  }

  @Get('/github/callback')
  @UseGuards(AuthGuard('github'))
  async githubCallback(@Req() request, @Res() response) {
    const url = buildOauthRedirectUrl(request);
    return response.redirect(url);
  }

  @Post('/register')
  @ApiResponse(UserResponseDto)
  async userRegistration(@Body() body: UserRegistrationBodyDto) {
    return await this.userRegisterUsecase.execute(
      UserRegisterCommand.create({
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        roles: body.roles,
        organizationName: body.organizationName,
      }),
    );
  }

  @Post('/login')
  async userLogin(@Body() body: LoginBodyDto) {
    return await this.loginUsecase.execute(
      LoginCommand.create({
        email: body.email,
        password: body.password,
      }),
    );
  }
}
