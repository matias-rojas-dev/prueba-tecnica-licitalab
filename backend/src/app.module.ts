import { Module } from '@nestjs/common';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [OpportunitiesModule],
  providers: [PrismaService],
})
export class AppModule {}
