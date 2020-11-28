import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassPresenceController } from './classPresence.controller';
import { ClassPresence } from './classPresence.entity';
import { ClassPresenceService } from './classPresence.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassPresence])
  ],
  controllers: [ClassPresenceController],
  providers: [ClassPresenceService],
})

export class ClassPresenceModule {}
