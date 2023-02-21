import http from '@debens/http';
import { AuthModule, getTokenFromRequest, User } from '@debens/nestjs-auth';
import { IdentityAPI } from '@debens/service-identity';
import { Module } from '@nestjs/common';

import { Request } from 'express';
import { CLS_REQ, ClsModule } from 'nestjs-cls';

import { UserController } from './controllers/user.controller';
import { PasskeysResolver } from './resolvers/passkeys.resolver';
import { UserResolver } from './resolvers/user.resolver';

@Module({
    imports: [
        ClsModule.forFeature(User),
        ClsModule.forFeatureAsync({
            provide: IdentityAPI,
            inject: [CLS_REQ],
            useFactory: async (request: Request) => {
                return new IdentityAPI(
                    http.client.extend([
                        http.modules.domain('http://localhost:3000'),
                        http.modules.bearer({
                            get token() {
                                return getTokenFromRequest(request);
                            },
                        }),
                    ]),
                );
            },
        }),
        AuthModule,
    ],
    providers: [UserResolver, PasskeysResolver],
    controllers: [UserController],
})
export default class UserModule {}
