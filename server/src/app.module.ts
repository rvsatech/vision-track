import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { BobinasModule } from './modules/bobinas/bobinas.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    BobinasModule,
    AuthModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
