import { AuthModule } from '@debens/nestjs-auth';
import { Module } from '@nestjs/common';

import { UserResolver } from './resolvers/user.resolver';

@Module({ imports: [AuthModule], providers: [UserResolver] })
export default class UserModule {}
