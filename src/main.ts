import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DomainExceptionFilter } from "./account/errors/domain-exception.filter";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new DomainExceptionFilter());
  await app.listen(port);
}
bootstrap();
