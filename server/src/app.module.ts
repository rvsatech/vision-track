import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/database/prisma/prisma.module';
import { UsersModule } from '@/modules/core/users/users.module';
import { AuthModule } from '@/modules/core/auth/auth.module';
import { CompaniesModule } from '@/modules/core/companies/companies.module';
import { PlansModule } from '@/modules/core/plans/plans.module';
import { InspectionsModule } from '@/modules/ai/inspections/inspections.module';
import { UploadsModule } from '@/modules/platform/uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CompaniesModule,
    PlansModule,
    InspectionsModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
