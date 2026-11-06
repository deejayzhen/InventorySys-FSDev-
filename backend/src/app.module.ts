import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PcPartsModule } from './pc-parts/pc-parts.module';

@Module({
  imports: [PcPartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
