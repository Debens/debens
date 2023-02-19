import http from '@debens/http';
import { AuthModule } from '@debens/nestjs-auth';
import { IdentityAPI } from '@debens/service-identity';
import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';
import { UserResolver } from './resolvers/user.resolver';

@Module({
    imports: [AuthModule],
    providers: [
        UserResolver,
        {
            provide: IdentityAPI,
            useValue: new IdentityAPI(http.client.extend([http.modules.domain('http://localhost:3000')])),
        },
    ],
    controllers: [UserController],
})
export default class UserModule {}
