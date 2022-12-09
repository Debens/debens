import { ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import morgan from 'morgan';

import { AppModule } from './app.module';
import rabbitmqConfig from './config/rabbitmq.config';

(async () => {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.use(morgan('combined'));

    const config = new DocumentBuilder()
        .setTitle('service-identity')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await ConfigModule.envVariablesLoaded;
    const rmq = app.get(ConfigService).get<ConfigType<typeof rabbitmqConfig>>('rabbitmq');

    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${rmq?.user}:${rmq?.password}@${rmq?.host}:${rmq?.port}`],
            queue: 'identity_queue',
            queueOptions: {
                durable: false,
            },
        },
    });

    await app.startAllMicroservices();
    await app.listen(3000);
})();
