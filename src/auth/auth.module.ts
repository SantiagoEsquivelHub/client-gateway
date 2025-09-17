import { Module } from '@nestjs/common';
import { NastModule } from 'src/transports/nast.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [NastModule]
})
export class AuthModule {}
