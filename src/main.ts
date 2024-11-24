import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from './Auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { LoggingService } from './LoggingService/logging.service';
import { CustomExceptionFilter } from './LoggingService/exception.filter';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  process.on('uncaughtException', (error) => {
    loggingService.error('Uncaught Exception', error.stack);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled Rejection', JSON.stringify(reason));
  });

  const config = new DocumentBuilder()
    .setTitle('REST Service')
    .setDescription(
      'Home Library Service! Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!',
    )
    .setVersion('1.0')
    .addTag('library')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard(new JwtService()));

  app.useGlobalFilters(new CustomExceptionFilter(loggingService));

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
