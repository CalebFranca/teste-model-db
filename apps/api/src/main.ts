import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

try {
  process.loadEnvFile('.env')
} catch {
  // .env é opcional — as vars podem já estar no ambiente
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173' })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  const port = process.env.PORT ? Number(process.env.PORT) : 4001
  await app.listen(port)
  console.log(`[api] listening on http://localhost:${port}`)
}

bootstrap()
