import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UsersModule } from './modules/core/users/users.module';
import { AuthModule } from './modules/core/auth/auth.module';
import { CompaniesModule } from './modules/core/companies/companies.module';
import { PlansModule } from './modules/core/plans/plans.module';
import { SubscriptionsModule } from './modules/core/subscriptions/subscriptions.module';
import { AiModelsModule } from './modules/ai/ai-models/ai-models.module';
import { InspectionsModule } from './modules/ai/inspections/inspections.module';
import { ImagesModule } from './modules/ai/images/images.module';
import { BillingModule } from './modules/platform/billing/billing.module';
import { UploadsModule } from './modules/platform/uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CompaniesModule,
    PlansModule,
    SubscriptionsModule,
    AiModelsModule,
    InspectionsModule,
    ImagesModule,
    BillingModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
