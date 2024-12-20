import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database/database.config';
import databaseProviders from './database/database.providers';
import AuthModule from './auth/auth.module';
import authConfig from './security/security.config';
import { UserMiddleware } from './security/middlewares/user.middleware';
import { SecurityModule } from './security/security.module';
import { SecurityService } from './security/security.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
    }),
    AuthModule,
    SecurityModule,
  ],
  controllers: [],
  providers: [
    ...databaseProviders,
    SecurityService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes("*")
  }
}