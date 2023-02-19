import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import morgan from 'morgan';

import AppModule from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.use(morgan('combined'));

    if (process.env.SWAGGER_ENABLED) {
        const config = new DocumentBuilder()
            .setTitle('service-gateway')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('swagger', app, document);
    }

    await ConfigModule.envVariablesLoaded;

    await app.listen(process.env.PORT || 3000);
}

bootstrap();
