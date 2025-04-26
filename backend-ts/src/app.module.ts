import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CasesModule } from './cases/cases.module';

@Module({
  imports: [PrismaModule, CasesModule],
})
export class AppModule {}
