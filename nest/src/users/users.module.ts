import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { CurrentUserMiddleware } from 'src/common/middlewares/current-user.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])

  ],
  controllers: [UsersController],
  providers: [AuthService, UsersService],
  exports: [UsersService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
