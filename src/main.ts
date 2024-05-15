// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const corsOptions: CorsOptions = {
//     origin: ['https://bottrade-git-develop-lucasbgarcias-projects.vercel.app'], // Substitua pelo domínio do seu front-end na Vercel
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   };
//   app.enableCors(corsOptions);

//   await app.listen(3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configurando CORS
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
