import { IdentityAPI } from '@debens/service-identity';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AxiosError } from 'axios';

import { IdentifierDTO } from '../requests/identifier.dto';
import { VerifyPasscodeDTO } from '../requests/verify-passcode.dto';
import { VerifyPasskeyDTO } from '../requests/verify-passkey.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    @Inject(IdentityAPI)
    private readonly identity!: IdentityAPI;

    @Post('/enter')
    async authenticate(@Body() { email }: IdentifierDTO) {
        const response = await this.identity.search(email).catch((error: AxiosError) => {
            if (error?.response?.status !== 404) {
                throw error;
            }
        });

        const user = response?.data;
        if (!user) {
            const user = await this.identity.create(email).then(response => response.data);
            return Object.assign({}, { user: user.id }, user.challenges[0]);
        } else {
            const challenge = user.credentials.length
                ? await this.identity.device.challenge(user.id).then(response => response.data)
                : await this.identity.email.challenge(user.id).then(response => response.data);

            return Object.assign({}, { user: user.id }, challenge);
        }
    }

    @Post('enter/[:]with-passcode')
    async withPasscode(@Body() { user, challenge, code }: VerifyPasscodeDTO) {
        return await this.identity.email.verify(user, code, challenge).then(response => response.data);
    }

    @Post('enter/[:]with-passkey')
    async withPasskey(@Body() { user, ...countersign }: VerifyPasskeyDTO) {
        return await this.identity.device.verify(user, countersign).then(response => response.data);
    }
}
