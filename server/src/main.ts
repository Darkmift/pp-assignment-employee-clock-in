import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AllExceptionsFilter from './common/filters/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // apply global exception filter
  const filter = new AllExceptionsFilter();
  app.useGlobalFilters(filter);

  await app.listen(3000);
}
bootstrap();
