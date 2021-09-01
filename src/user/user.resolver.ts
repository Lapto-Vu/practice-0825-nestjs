import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login-user.dto';
import { SeeProfileInput, SeeProfileOutput } from './dtos/see-profile.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => CreateUserOutput)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      const { ok, error } = await this.userService.createUser(createUserInput);
      return { ok, error };
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Mutation((returns) => LoginOutput)
  async loginUser(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return this.userService.LoginUser(loginInput);
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Query((returns) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @UseGuards(AuthGuard)
  @Query((returns) => SeeProfileOutput)
  async seeProfile(
    @Args() seeProfileInput: SeeProfileInput,
  ): Promise<SeeProfileOutput> {
    try {
      const user = await this.userService.findById(seeProfileInput.userId);
      if (!user) {
        throw Error();
      }
      return { ok: true, user };
    } catch (e) {
      return { ok: false, error: 'user not found' };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation((retuns) => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      await this.userService.editProfile(authUser.id, editProfileInput);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
