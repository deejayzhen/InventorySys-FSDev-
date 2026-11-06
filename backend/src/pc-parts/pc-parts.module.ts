import { Module } from '@nestjs/common';
import { PcPartsService } from './pc-parts.service';
import { PcPartsController } from './pc-parts.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PcPartsController],
  providers: [PcPartsService, PrismaService],
})
export class PcPartsModule {}
