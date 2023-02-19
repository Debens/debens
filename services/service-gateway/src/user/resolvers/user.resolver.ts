import {
    createParamDecorator,
    ExecutionContext,
    Injectable,
    UseGuards,
} from '@nestjs/common';
import { GqlExecutionContext, Query, Resolver } from '@nestjs/graphql';

import { GraphQLGuard } from '../../auth/graphql.guard';
import * as types from '../user.types';

interface Claims {
    sub: string;
}

export const Claims = createParamDecorator((_: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});

@Injectable()
@Resolver(types.User)
export class UserResolver {
    @UseGuards(GraphQLGuard)
    @Query(_return => types.User, { nullable: true })
    viewer(@Claims() claims: Claims): types.User | null {
        return new types.User(claims.sub);
    }
}
