import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresenceController } from './presence.controller';
import { Presence } from './presence.entity';
import { PresenceService } from './presence.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Presence])
  ],
  controllers: [PresenceController],
  providers: [PresenceService],
})

export class PresenceModule {}
