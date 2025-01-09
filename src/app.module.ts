import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database/database.config';
import databaseProviders from './database/database.providers';
import AuthModule from './auth/auth.module';
import authConfig from './security/security.config';
import { UserMiddleware } from './security/middlewares/user.middleware';
import { SecurityModule } from './security/security.module';
import { SecurityService } from './security/security.service';
import securityConfig from './security/security.config';
import filesystemConfig from './filesystem/filesystem.config';
import { FilesystemModule } from './filesystem/filesystem.module';
import { StorageModule } from './store/storage.module';
import { ShopModule } from './shop/shop.module';
import appConfig from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [
        databaseConfig, 
        authConfig, 
        securityConfig, 
        filesystemConfig,
        appConfig,
      ],
    }),
    AuthModule,
    SecurityModule,
    FilesystemModule,
    StorageModule,
    ShopModule,
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