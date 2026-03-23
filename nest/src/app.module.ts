import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
const cookieSession = require('cookie-session');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          // database: config.get<string>('DB_NAME'),
          database: 'data/database.sqlite',
          synchronize: true,
          autoLoadEntities: true, 
          entities: [User, Product],
        };
      },
    }),
    UsersModule,
    ProductsModule,],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(
//         cookieSession({
//           keys: ['asdfasfd'],
//         }),
//       )
//       .forRoutes('*');
//   }
// }
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          name: 'session',
          keys: ['asdfasfd'],
          maxAge: 24 * 60 * 60 * 1000,
          secure: false,
          httpOnly: true,
          sameSite: 'lax',
        }),
      )
      .forRoutes('*');
  }
}