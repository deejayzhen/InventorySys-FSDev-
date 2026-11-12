import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PcPartsModule } from './pc-parts/pc-parts.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PcPartsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
